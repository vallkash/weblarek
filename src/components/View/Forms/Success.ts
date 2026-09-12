import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

export interface ISuccess {
    cost: number;
}

export class Success extends Component<ISuccess> {
    protected costElement: HTMLElement;
    protected againButtonEl: HTMLButtonElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        this.costElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.againButtonEl = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        
        this.againButtonEl.addEventListener('click', () => this.events.emit('gallery: returned'));
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