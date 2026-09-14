import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { ICard } from "./Card";
import { CDN_URL, categoryMap} from "../../../utils/constants";
import { IEvents } from "../../base/Events";

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

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.descriptionEl = ensureElement<HTMLElement>('.card__text', this.container);
        this.buyButtonEl = ensureElement<HTMLButtonElement>('.card__button', this.container);    
        
        this.buyButtonEl.addEventListener('click', () => {
            this.events.emit('preview: clicked', { id: this.id });
        })
       
    }
    
    set image(src: string) {
        this.imageElement.src = CDN_URL + src;
        this.imageElement.alt = "";
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
            this.image = data.image;
            this.buttonText = data.buttonText;
            this.disabled = data.isDisabled;
            this.category = data.category;
        }
        return this.container;
    }
}