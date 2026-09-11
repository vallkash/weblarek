import { Form, IForm } from "./Form";
import { ensureElement} from "../../../utils/utils";
import { TPayment } from "../../../types";

interface IPayForm extends IForm {
    address: string;
    payment: TPayment | null;
}

export class PayForm extends Form<IPayForm> {
    protected cardButtonElement: HTMLButtonElement;
    protected cashButtonElement: HTMLButtonElement;
    protected addressElement: HTMLInputElement;

    constructor(container: HTMLElement) {
        super(container);
        this.cardButtonElement = ensureElement<HTMLButtonElement>('.button[type="card"]', this.container);
        this.cashButtonElement = ensureElement<HTMLButtonElement>('.button[type="cash"]', this.container);
        this.addressElement = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
    }

    setData(data: Partial<IPayForm>): void {
        if (data.payment !== undefined) {
            if (this.cardButtonElement.getAttribute('name') === data.payment) {
                this.cardButtonElement.classList.toggle('button_alt-active', true);
                this.cashButtonElement.classList.toggle('button_alt-active', false);
            } if (this.cashButtonElement.getAttribute('name') === data.payment) {
                this.cashButtonElement.classList.toggle('button_alt-active', true);
                this.cardButtonElement.classList.toggle('button_alt-active', false);
            }
        }

        if (data.address !== undefined) {
            this.addressElement.value = data.address;
        }
    }

    render(data?: Partial<IPayForm>): HTMLElement {
        if (data) {
            this.setData(data);
        }
        return this.container;
    }
}