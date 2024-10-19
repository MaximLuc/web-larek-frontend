import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Components";

interface ICardBasket{
    title:string;
    price:number;
}

interface ICardBasketActions {
    onClick: (event: MouseEvent) => void;
}

export class CardBasket extends Component<ICardBasket>{
    protected _productId:string
    protected _index:HTMLElement;
    protected _title:HTMLElement;
    protected _price:HTMLElement;
    protected _button: HTMLButtonElement;
    id: number =0;
    static idCounter: number = 0;

    constructor(container: HTMLElement, actions?: ICardBasketActions) {
        super(container);
        this.id = ++CardBasket.idCounter;
        this._title = container.querySelector('.card__title')
        this._button = container.querySelector(`.basket__item-delete`);
        this._price = container.querySelector(`.card__price`);
        this._index = container.querySelector('.basket__item-index')


        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }
    setProductData(product: IProduct) {
        this._productId = product.id
        this._index.textContent = this.id.toString() 
        this._title.textContent = product.title;
        this._price.textContent = `${product.price} синапсов`;
    }
    getContainer(){
        return this.container; 
    }
    getIndex(){
        return this._index.textContent
    }

    getProductId(){
        return this._productId 
    }
}

