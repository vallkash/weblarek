import { Form, IForm } from "./Form";
import { ensureElement} from "../../../utils/utils";
import { TPayment } from "../../../types";
import { IEvents } from "../../base/Events";

interface IPayForm extends IForm {
    address: string;
    payment: TPayment | null;
    isDisabled: boolean;
}

export class PayForm extends Form<IPayForm> {
    protected cardButtonEl: HTMLButtonElement;
    protected cashButtonEl: HTMLButtonElement;
    protected addressElement: HTMLInputElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        this.cardButtonEl = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.cashButtonEl = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.addressElement = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.events.emit('form: onward')
        });
        this.addressElement.addEventListener('input', () => {
            this.events.emit('form: changed', {
                field: 'address',
                value: this.addressElement.value
            })
        });
        this.cardButtonEl.addEventListener('click', () => this.events.emit('form: changed', {
            field: 'payment',
            value: 'card'
        }));
        this.cashButtonEl.addEventListener('click', () => this.events.emit('form: changed', {
            field: 'payment',
            value: 'cash'
        }));
    }

    set disabled(value: boolean) {
        this.submitButton.disabled = value;
    }

    setData(data: Partial<IPayForm>): void {
        if (data.payment !== undefined) {
            this.cardButtonEl.classList.toggle('button_alt-active', data.payment === 'card');
            this.cashButtonEl.classList.toggle('button_alt-active', data.payment === 'cash');
        }

        if (data.address !== undefined) {
            this.addressElement.value = data.address;
        }
    }

    render(data?: Partial<IPayForm>): HTMLElement {
        if (data) {
            this.setData(data);
            if (data.isDisabled === undefined) {
                data.isDisabled = false;
            }
            this.submitButton.disabled = data.isDisabled;
        }
        return this.container;
    }
}