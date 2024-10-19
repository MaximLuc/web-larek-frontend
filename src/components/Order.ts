
import {IOrderForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";
import { Form, IFormState } from "./common/Form";

export class Order extends Form<IOrderForm> {
    private paymentMethod: string | null = null;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.container.querySelectorAll('button[name="card"], button[name="cash"]').forEach((button) => {
            button.addEventListener('click', (e: Event) => {
                this.onPaymentMethodSelect(e.target as HTMLButtonElement);
            });
        });

        const addressInput = this.container.elements.namedItem('address') as HTMLInputElement;
        addressInput.addEventListener('input', () => {
            this.validateForm();
        });
    }


    private validateForm() {
        const address = (this.container.elements.namedItem('address') as HTMLInputElement).value.trim();
        

        const isValid = address.length > 0 && this.paymentMethod !== null;
        this.valid = isValid;
    }


    protected onPaymentMethodSelect(button: HTMLButtonElement) {
        this.container.querySelectorAll('button[name="card"], button[name="cash"]').forEach((btn) => {
            btn.classList.remove('button_alt-active'); 
        });
        button.classList.add('button_alt-active');
        this.paymentMethod = button.name;
        this.validateForm();
    }


    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

    render(state: Partial<IOrderForm> & IFormState) {
        const {address, ...restState} = state;
        super.render(restState);
        this.address = address || '';
        return this.container;
    }
}