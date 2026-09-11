import { Component } from ".../base/Component";

export abstract class Form extends Component<object> {
    constructor(protected readonly container: HTMLElement) {
        
    }
}