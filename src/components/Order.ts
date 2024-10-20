
import {IFormState, IOrderForm} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";
import { Form} from "./common/Form";

export class Order extends Form<IOrderForm> {
    protected paymentMethod: string | null = null;
    protected errorElement: HTMLElement;

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


        this.errorElement = document.createElement('p');
        this.errorElement.className = 'error-message';
        this.errorElement.style.display = 'none'; 
        this.errorElement.textContent = 'Пожалуйста, введите адрес.';
        addressInput.insertAdjacentElement('afterend', this.errorElement);


        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.validateForm();
            if (this.valid) {
                this.events.emit('order:next');
            }
        });
    }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    getContainer() {
        return this.container;
    }

    private validateForm() {
        const addressInput = this.container.elements.namedItem('address') as HTMLInputElement;
        const address = addressInput.value.trim();
        const isValid = address.length > 0 && this.paymentMethod !== null;

        this.valid = isValid;


        if (address.length === 0) {
            this.errorElement.style.display = 'block'; 
        } else {
            this.errorElement.style.display = 'none'; 
        }
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
        const { address, ...restState } = state;
        super.render(restState);
        this.address = address || '';
        return this.container;
    }
}

