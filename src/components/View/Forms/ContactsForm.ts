import { Form, IForm } from "./Form";
import { ensureElement} from "../../../utils/utils";

interface IContactsForm extends IForm {
    email: string;
    phone: string;
}

export class ContactsForm extends Form<IContactsForm> {
    protected emailElement: HTMLInputElement;
    protected phoneElement: HTMLInputElement;

    constructor(container: HTMLElement) {
        super(container);
        this.emailElement = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneElement = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
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