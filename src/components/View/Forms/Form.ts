import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

export interface IForm {

}

export abstract class Form<T extends IForm> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;
    
    constructor(container: HTMLElement) {
        super(container);
        this.submitButton = ensureElement<HTMLButtonElement>('.button[type="submit"]', this.container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
    }

    abstract setData(data: Partial<T>): void;

    set error(value:string[]) {
        this.errorsElement.textContent = value.join('; ');
    };

    set disabled(value: boolean) {
        this.submitButton.disabled = value;
    }

    render(data?: Partial<T> ): HTMLElement {
        if (data) {
            this.setData(data);
        }
        return this.container;
    }    
}