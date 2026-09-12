import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICard } from "./Card";
import { IEvents } from "../../base/Events";
import { getElementData } from "../../../utils/utils";

interface ICardBasket extends ICard {
    index: number;
    id: string;
}

export class CardBasket extends Card<ICardBasket> {
    protected indexElement: HTMLElement;
    protected deleteElement: HTMLButtonElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        this.deleteElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
    
        this.deleteElement.addEventListener('click', () => {
            const data = getElementData<{id: string}>(this.container, {id: String})
            this.events.emit('card: deleted', {id: data.id})
        });
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }

    render(data?: ICardBasket): HTMLElement {
        if (data) {
            super.render(data);
            this.index = data.index +1 ;
            this.container.dataset.id = data.id;
        }
        return this.container;
    }
}