import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Components";
import { EventEmitter } from "../base/events";
import { CardBasket } from "./CardsBasket";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.button');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open');
            });
        }

        this.items = [];
        this.selected = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
        this.updateButtonState(items.length);
    }

    set selected(items: string[]) {
        this.updateButtonState(items.length);
    }

    set total(total: number) {
        this.setText(this._total, `${total} синапсов`);
    }

    private updateButtonState(hasItems: number) {
        if (hasItems) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    }
}