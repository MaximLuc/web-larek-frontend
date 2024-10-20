import { Component } from "../base/Components";

interface ISuccessView {
    total: number;

}
interface ISuccessActions {
    onClick: (event: MouseEvent) => void;
}
export class Success extends Component<ISuccessView> {

    protected _total: HTMLElement;
    protected _button : HTMLButtonElement;

    constructor(container: HTMLElement,actions?: ISuccessActions) {
        super(container);

        this._total = this.container.querySelector('.order-success__description');
        this._button = this.container.querySelector('.order-success__close');

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } 
        }

    }

    set total(total: number) {
        this.setText(this._total, `Списано ${total} синапсов`);
    }
}