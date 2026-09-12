import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

export interface ICard {
    title: string;
    price: number | null;
}

export abstract class Card<T extends ICard> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set price(value: number | null) {
        this.priceElement.textContent = (value !== null) ? `${value} синапсов` : `Бесценно`;
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    render(data?: T): HTMLElement {
        if (data) {
            this.title = data.title;
            this.price = data.price;
        }
        return this.container;
    }
}