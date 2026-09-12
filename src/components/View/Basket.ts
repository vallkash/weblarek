import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface IBusket {
    total: number;
    shoppingList: HTMLElement[];
}

export class Basket extends Component<IBusket> {
    protected arrangeButton: HTMLButtonElement;
    protected basketList: HTMLElement;
    protected totalPrice: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        this.arrangeButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.basketList = ensureElement<HTMLElement>('.basket__list', this.container);
        this.totalPrice = ensureElement<HTMLElement>('.basket__price', this.container);
    
        this.arrangeButton.addEventListener('click', () => this.events.emit('order: issued'));
    }

    set items(items: HTMLElement[]) {
        this.basketList.replaceChildren(...items);
    }

    set price(value: number) {
        this.totalPrice.textContent = `${value} синапсов`;
    }

    set disabled(value: boolean) {
        this.arrangeButton.disabled = value;
    }

    render(data?: IBusket): HTMLElement {
        if (data) {
            super.render(data);
            this.price = data.total;
            this.items = data.shoppingList;
            this.disabled = data.shoppingList.length === 0;
        }
        return this.container;
    }
}