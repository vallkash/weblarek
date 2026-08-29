import { IItem } from "../../types";

export class Cart {
  protected purchase: IItem[] = [];

  constructor() {}

  getSelectedItems(): IItem[] {
    return this.purchase;
  }

  addSelectedItem(item: IItem): void {
    if (!this.isPresent(item.id)) {
      this.purchase.push(item);
    }
  }

  deleteSelectedItem(id: string): void {
    this.purchase = this.purchase.filter((item) => item.id !== id);
  }

  clearCart(): void {
    this.purchase = [];
  }

  getTotal(): number {
    return this.purchase.reduce((sum, item) => {
      sum += item.price ?? 0;
      return sum;
    }, 0);
  }

  getAmount(): number {
    return this.purchase.length;
  }

  isPresent(id: string): boolean {
    return this.purchase.some((item) => item.id === id);
  }
}