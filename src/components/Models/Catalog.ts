import { IItem } from "../../types";

export class Catalog {
  protected allItems: IItem[] = [];
  protected selectedItem: IItem | null = null;

  constructor() {}

  setItems(allItems: IItem[]): void {
    this.allItems = allItems;
    //
  }

  getItems(): IItem[] {
    return this.allItems;
  }

  getItemById(id: string): IItem | undefined {
    return this.allItems.find((item) => item.id === id);
  }

  setItem(item: IItem | null): void {
    this.selectedItem = item;
  }

  getItem(): IItem | null {
    return this.selectedItem;
  }
}