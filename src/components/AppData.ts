import {FormErrors, IAppState, ICartItem, IOrder, IProduct, IProductStore} from '../types/index'
import { cloneTemplate } from '../utils/utils';
import { AuctionAPI} from './AuctionAPI'
import { Model } from './base/Model';
import {Card} from './common/Card'
import { CardBasket } from './common/CardsBasket';



export type CatalogChangeEvent = {
    catalog: Product[]
};

export class Product extends Model<IProduct> {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;    
    events: any; 
    emitChanges: () => void;
}


export class ProductStore implements IProductStore {
    products: Product[] = [];
    targetItem : ICartItem;
    api: AuctionAPI;
    constructor(api: AuctionAPI) {
        this.api = api;
        this.loadProducts();
    }

    async loadProducts() {
        try {
            this.products = await this.api.getProductList();
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    }

     getAllProducts(): Product[]{
        return this.products;
    };

    getProduct(id:string):Product{
        return this.products.find(item => item.id === id);
    }

    addProducts(newProducts: Product[]): void{
        this.products = [...this.products, ...newProducts];
    };

    deleteProducts(newProducts: IProduct[]): void{
        this.products = this.products.filter(product => !newProducts.includes(product));
    };


}

export class AppState extends Model<IAppState> {
    basket: CardBasket[] =[];
    catalog: IProduct[];
    loading: boolean;
    order: IOrder = {
        email: '',
        phone: '',
        items: [],
        payment:'',
        address:'',
        total:0
    };
    preview: string | null;
    formErrors: FormErrors = {};

    clearBasket() {

    }

    deleteItemBasket(itemToRemove:CardBasket){
        console.log('Deleting item:', itemToRemove);
        this.basket = this.basket.filter(item => item.id != itemToRemove.id);
        console.log(this.basket)

    }

    // addBasketCard(item:Product, cardBasketTemplate:HTMLTemplateElement){
    //     this.basket.push(
    //         new CardBasket(cloneTemplate(cardBasketTemplate),{onClick:()=>{
    //             console.log('card basket click');
    //             this.emitChanges('items:delete', {item});
    //         }})
    //     )
    //     this.basket[this.basket.length -1].setProductData(item)
    //     console.log(this.basket)
    // }

    addBasketCard(item: Product, cardBasketTemplate: HTMLTemplateElement) {
        
        const index = this.basket.findIndex(itemBasket => itemBasket.getProductId() === item.id);
    
        if (index !== -1) {
            return false
        } else {
            const basketCard = new CardBasket(cloneTemplate(cardBasketTemplate), {
                onClick: () => {
                    this.emitChanges('items:delete', basketCard);
                }
            });

            this.basket.push(basketCard);
            this.basket[this.basket.length - 1].setProductData(item);
            return true;
        }
       
    }

    getTotal() {
        return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
    }

    setCatalog(items: IProduct[]) {

        this.catalog = items.map((item) => new Product(item, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    setPreview(item: Product) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}