import { Form, IForm } from "./Form";
import { ensureElement} from "../../../utils/utils";
import { IEvents } from "../../base/Events";

interface IContactsForm extends IForm {
    email: string;
    phone: string;
}

export class ContactsForm extends Form<IContactsForm> {
    protected emailElement: HTMLInputElement;
    protected phoneElement: HTMLInputElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        this.emailElement = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneElement = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
        
    
        this.submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.events.emit('form: finished');
        })
        this.emailElement.addEventListener('input', () => {
            this.events.emit('form: changed', {
                field: 'email',
                value: this.emailElement.value
            })
        });
        this.phoneElement.addEventListener('input', () => {
            this.events.emit('form: changed', {
                field: 'phone',
                value: this.phoneElement.value
            })
        });
    }

    setData(data: Partial<IContactsForm>): void {
        if (data.email !== undefined) {
            this.emailElement.value = data.email;
        }
        if (data.phone !== undefined) {
            this.phoneElement.value = data.phone;
        }
    }

    render(data?: Partial<IContactsForm>): HTMLElement {
        if (data) {
            this.setData(data);
        }
        return this.container;
    }
}