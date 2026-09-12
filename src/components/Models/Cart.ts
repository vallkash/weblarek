import { IItem } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
  protected purchase: IItem[] = [];

  constructor(protected events: IEvents) {}

  getSelectedItems(): IItem[] {
    return this.purchase;
  }

  addSelectedItem(item: IItem): void {
    if (!this.isPresent(item.id)) {
      this.purchase.push(item);
    }
    this.events.emit('cart: changed');
  }

  deleteSelectedItem(id: string): void {
    this.purchase = this.purchase.filter((item) => item.id !== id);
    this.events.emit('cart: changed');
  }

  clearCart(): void {
    this.purchase = [];
    this.events.emit('cart: changed');
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