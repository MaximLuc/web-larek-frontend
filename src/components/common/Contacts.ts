import { IEvents } from "../base/events";
import { Form, IFormState } from "./Form";


export interface IContactForm {
    email: string;
    phone: string;
    valid: boolean;
    errors: string[];
}

export class Contacts extends Form<IContactForm> {

    
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        console.log('export class Contacts extends Form<IContactForm>')
        this.container.addEventListener('input', () => {
            this.validateForm();
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            console.log('m')
            if (this.valid) {
                this.events.emit('contactsForm:submit');
            }
        });
    }

    getContainer(){
        return this.container;
    }

    private validateForm() {
        const email = (this.container.elements.namedItem('email') as HTMLInputElement).value.trim();
        const phone = (this.container.elements.namedItem('phone') as HTMLInputElement).value.trim();
        
        const isValid = email.length > 0 && phone.length > 0;  // Простейшая валидация
        this.valid = isValid;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    render(state: Partial<IContactForm> & IFormState) {
        const {email, phone, ...restState} = state;
        super.render(restState);
        this.email = email || '';
        this.phone = phone || '';
        return this.container;
    }
}