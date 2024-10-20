import { IContactForm, IFormState } from "../../types";
import { IEvents } from "../base/events";
import { Form} from "./Form";




export class Contacts extends Form<IContactForm> {
    protected errorElement: HTMLElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        console.log('export class Contacts extends Form<IContactForm>');


        this.errorElement = document.createElement('p');
        this.errorElement.className = 'error-message';
        this.errorElement.style.display = 'none'; 
        this.errorElement.textContent = 'Введите пожалуйста номер телефона и почту.';
        this.container.insertAdjacentElement('beforeend', this.errorElement); 


        this.container.addEventListener('input', () => {
            this.validateForm();
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.validateForm();
            if (this.valid) {
                this.events.emit('contactsForm:submit');
            }
        });
    }

    getContainer() {
        return this.container;
    }

    private validateForm() {
        const email = (this.container.elements.namedItem('email') as HTMLInputElement).value.trim();
        const phone = (this.container.elements.namedItem('phone') as HTMLInputElement).value.trim();


        const isValid = email.length > 0 && phone.length > 0;
        this.valid = isValid;

        
        if (!isValid) {
            this.errorElement.style.display = 'block'; 
        } else {
            this.errorElement.style.display = 'none'; 
        }
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    render(state: Partial<IContactForm> & IFormState) {
        const { email, phone, ...restState } = state;
        super.render(restState);
        this.email = email || '';
        this.phone = phone || '';
        return this.container;
    }
}