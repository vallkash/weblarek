import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IHeader {
    counter: number;
}

export class Header extends Component<IHeader> {
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;

    constructor(protected container: HTMLElement) {
        super(container);
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
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