import { Component } from "../base/Component";

interface IGallery {
    items: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    constructor(protected container: HTMLElement) {
        super(container);
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }

    render(data?: IGallery): HTMLElement {
        if (data) {
            super.render(data);
            this.catalog = data.items;
        }
        return this.container;
    }
}