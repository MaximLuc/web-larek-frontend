import {ICartItem, IProduct, IProductStore} from '../types/index'
import { AuctionAPI} from './AuctionAPI'

export class ProductStore implements IProductStore {
    products: IProduct[] = [];
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

     getAllProducts(): IProduct[]{
        return this.products;
    };

    getProduct(id:string):IProduct{
        return this.products.find(item => item.id === id);
    }

    addProducts(newProducts: IProduct[]): void{
        this.products = [...this.products, ...newProducts];
    };

    deleteProducts(newProducts: IProduct[]): void{
        this.products = this.products.filter(product => !newProducts.includes(product));
    };


}