import {ICardActions, IProduct} from '../../types/index'
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Components';
import { EventEmitter } from '../base/events';
import {colorCategory} from '../../utils/constants'



export class Card extends Component<IProduct>{
    protected _card__category:HTMLElement;
    protected _card__title:HTMLElement;
    protected _card__image:HTMLImageElement;
    protected _card__price:HTMLElement;


    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._card__category =this.container.querySelector('.card__category');
        this._card__title = this.container.querySelector('.card__title');
        this._card__image = this.container.querySelector('.card__image');
        this._card__price = this.container.querySelector('.card__price');

        if (actions?.onClick) {
            if (this.container) {
                this.container.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }
    setProduct(product: IProduct): void{
        this.setText(this._card__category,product.category)
        this.setText(this._card__title,product.title)
        this.setImage(this._card__image,product.image,product.description)
        this.setText( this._card__price,`${product.price} Синапсов`)
    };

    public getContainer(): HTMLElement {
        return this.container;
    }
}


export class CatalogItem extends Card {
    constructor(container: HTMLElement, actions?: ICardActions) {
        super('card', container, actions);
    }

    render(data?: Partial<IProduct>): HTMLElement {
        Object.assign(this as object, data ?? {});
        this.changeColorCatigory(data.category)
        if (data) {
            if (data.category) this.setText(this._card__category, data.category); 
            if (data.title) this.setText(this._card__title, data.title); 
            if (data.image) this.setImage(this._card__image, data.image, data.description); 
            if (data.price) this.setText(this._card__price, `${data.price} Синапсов`); 
        }
        return this.container;
    }

    changeColorCatigory(category:string ){
        this._card__category.classList.remove('card__category_other')
        this._card__category.classList.add(colorCategory[category])
    }
}

interface IAuctionActions {
    onSubmit: () => void;
}

export class ProductPreview extends Component<IProduct> {
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _text: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _price: HTMLElement;

    constructor(container: HTMLElement, actions?: IAuctionActions) {
        super(container);

        this._image = ensureElement<HTMLImageElement>('.card__image', container);
        this._category = ensureElement<HTMLElement>('.card__category', container);
        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._text = ensureElement<HTMLElement>('.card__text', container);
        this._button = ensureElement<HTMLButtonElement>('.card__button', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);

        this._button.addEventListener('click', () => {
            actions?.onSubmit?.();
        });
    }

    setProductData(product: IProduct) {
        this.changeColorCatigory(product.category)
        this._image.src = product.image;
        this._image.alt = product.title;
        this._category.textContent = product.category;
        this._title.textContent = product.title;
        this._text.textContent = product.description;
        this._price.textContent = `${product.price} синапсов`;
    }

    changeColorCatigory(category:string ){
        this._category.classList.remove('card__category_other')
        this._category.classList.add(colorCategory[category])
    }
}