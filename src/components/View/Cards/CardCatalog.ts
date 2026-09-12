import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { ICard } from "./Card";
import { CDN_URL, categoryMap} from "../../../utils/constants";
import { IEvents } from "../../base/Events";

interface ICardCatalog extends ICard {
    category: string;
    image: string;
}

export class CardCatalog extends Card<ICardCatalog> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected selectButtonEl: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.selectButtonEl = this.container;
        
        this.selectButtonEl.addEventListener('click', () => this.events.emit('card: selected', { title: this.titleElement.textContent ?? ''}));
    }

    setImage(element: HTMLImageElement, src: string, alt?: string): void {
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

    render(data?: ICardCatalog): HTMLElement {
        if (data) {
            super.render(data);
            this.category = data.category;
            this.setImage(this.imageElement, data.image, data.title);
        }
        return this.container;
    }
}