import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

export interface ISuccess {
    cost: number;
}

export class Success extends Component<ISuccess> {
    protected costElement: HTMLElement;
    protected againButtonEl: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);
        this.costElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.againButtonEl = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    }

    set cost(value: number) {
        this.costElement.textContent = `Списано ${value} синапсов`;
    }

    render(data?: ISuccess): HTMLElement {
        if (data) {
            this.cost = data.cost;
        }
        return this.container;
    }
}