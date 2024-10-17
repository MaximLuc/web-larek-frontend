import {IProduct, IProductCard} from '../../types/index'
import { Component } from '../base/Components';

export class Card extends Component<IProductCard>{
    protected _card__category:HTMLElement;
    protected _card__title:HTMLElement;
    protected _card__image:HTMLImageElement;
    protected _card__price:HTMLElement;
    constructor(container: HTMLElement) {
        super(container);
        this. _card__category =this.container.querySelector('.card__category');
        this._card__title = this.container.querySelector('.card__title');
        this._card__image = this.container.querySelector('.card__image');
        this._card__price = this.container.querySelector('.card__price');
    }
    setProduct(product: IProduct): void{
        this.setText(this._card__category,product.category)
        this.setText(this._card__title,product.title)
        this.setImage(this._card__image,product.image,product.description)
        this.setText( this._card__price,`${product.price} Синапсов`)
        console.log(this._card__category)
    };

    public getContainer(): HTMLElement {
        return this.container;
    }

}