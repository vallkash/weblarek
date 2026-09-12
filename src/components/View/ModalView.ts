import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IModalView {
    content: HTMLElement;
}

export class ModalView extends Component<IModalView> {
    protected closeButton: HTMLButtonElement;
    protected contentEl: HTMLElement;
    protected windowEl: HTMLElement;

    constructor(protected container: HTMLElement) {
        super(container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.contentEl = ensureElement<HTMLElement>('.modal__content', this.container);
        this.windowEl = ensureElement<HTMLElement>('.modal__container', this.container);

        this.container.addEventListener('click', this.close.bind(this));
        this.closeButton.addEventListener('click', this.close.bind(this));
        this.windowEl.addEventListener('click', (e) => e.stopPropagation());
    }

    set content(value: HTMLElement) {
        this.contentEl.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
    }

    close() {
        this.container.classList.remove('modal_active');
    }

    render(data?: IModalView): HTMLElement {
        if (data) {
            super.render(data);
            this.content = data.content;
        }        
        return this.container;
    }
}