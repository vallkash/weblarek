import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { ICard } from "./Card";
import { CDN_URL, categoryMap} from "../../../utils/constants";

interface ICardPreview extends ICard {
    category: string;
    image: string;
    description: string;
    buttonText: string;
    isDisabled: boolean;
}

export class CardPreview extends Card<ICardPreview> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected buyButtonEl: HTMLButtonElement;
    protected descriptionEl: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.descriptionEl = ensureElement<HTMLElement>('.card__text', this.container);
        this.buyButtonEl = ensureElement<HTMLButtonElement>('.card__button', this.container);    
    }
    
    protected setImage(element: HTMLImageElement, src: string, alt?: string): void {
        if (element) {
            element.src = CDN_URL + src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        if (value in categoryMap) {
            this.categoryElement.className = `card__category ${categoryMap[value as keyof typeof categoryMap]}`;
        } else {
            this.categoryElement.className = 'card__category card__category_default';
        }
    }

    set description(value: string) {
        this.descriptionEl.textContent = value;
    }

    set buttonText(value: string) {
        this.buyButtonEl.textContent = value;
    }

    set disabled(value: boolean) {
        this.buyButtonEl.disabled = value;
    }

    render(data?: ICardPreview): HTMLElement {
        if (data) {
            super.render(data);
            this.description = data.description;
            this.buyButtonEl.disabled = data.isDisabled;
        }
        return this.container;
    }
}