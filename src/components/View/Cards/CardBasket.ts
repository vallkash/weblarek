import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICard } from "./Card";

interface ICardBasket extends ICard {
    index: number;
}

export class CardBasket extends Card<ICardBasket> {
    protected indexElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }

    render(data?: ICardBasket): HTMLElement {
        if (data) {
            super.render(data);
            this.index = data.index;
        }
        return this.container;
    }
}