import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICard } from "./Card";

interface ICardBasket extends ICard {
    index: number;
}

export class CardBasket extends Card<ICardBasket> {
    protected indexElement: HTMLElement;
    protected deleteElement: HTMLButtonElement;

    constructor(protected container: HTMLElement, protected onDelete: () => void) {
        super(container);
        this.deleteElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
    
        this.deleteElement.addEventListener('click', () => {
            this.onDelete();
        });
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }

    render(data?: ICardBasket): HTMLElement {
        if (data) {
            super.render(data);
            this.index = data.index +1 ;
        }
        return this.container;
    }
}