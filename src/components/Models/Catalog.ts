import { IItem } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
  protected allItems: IItem[] = [];
  protected selectedItem: IItem | null = null;

  constructor(protected events: IEvents) {}

  setItems(allItems: IItem[]): void {
    this.allItems = allItems;
    this.events.emit('catalog: changed');
  }

  getItems(): IItem[] {
    return this.allItems;
  }

  getItemById(id: string): IItem | undefined {
    return this.allItems.find((item) => item.id === id);
  }

  setItem(item: IItem): void {
    this.selectedItem = item;
    this.events.emit('selectedItem: changed');
  }

  getItem(): IItem | null {
    return this.selectedItem;
  }
}