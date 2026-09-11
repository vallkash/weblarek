import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { ICard } from "./Card";
import { CDN_URL, categoryMap} from "../../../utils/constants";

interface ICardCatalog extends ICard {
    category: string;
    image: string;
}

export class CardCatalog extends Card<ICardCatalog> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
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

    render(data?: ICardCatalog): HTMLElement {
        if (data) {
            super.render(data);
            this.category = data.category;
            this.setImage(this.imageElement, data.image, data.title);
        }
        return this.container;
    }
}