import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IHeader {
    counter: number;
}

export class Header extends Component<IHeader> {
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        
        this.basketButton.addEventListener('click', () => this.events.emit('basket: opened'));
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }

    render(data?: IHeader): HTMLElement {
        if (data) {
            super.render(data);
            this.counter = data.counter;
        }
        return this.container;
    }
}