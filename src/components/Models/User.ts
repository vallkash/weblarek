import { IUser, validateErrrors, TPayment } from "../../types";
import { IEvents } from "../base/Events";


export class User {
  protected customer: IUser = {
    payment: null,
    email: "",
    phone: "",
    address: ""
  };

  constructor(protected events: IEvents) {}

  setPayment(payment: TPayment | null): void {
    this.customer.payment = payment;
    this.events.emit('user:changed');
  }

  setAdress(address: string): void {
    this.customer.address = address;
    this.events.emit('user:changed');
  }

  setPhone(phone: string): void {
    this.customer.phone = phone;
    this.events.emit('user:changed');
  }

  setEmail(email: string): void {
    this.customer.email = email;
    this.events.emit('user:changed');
  }

  getCustomerData(): IUser {
    return this.customer;
  }

  clearCustomerData(): void {
    this.customer.payment = null;
    this.customer.address = "";
    this.customer.phone = "";
    this.customer.email = "";
    this.events.emit('user:changed');
  }

  validateCustomerData(): validateErrrors {
    const errors: validateErrrors = {};
    if (!this.customer.payment) {
      errors.payment = "Необходимо указать способ оплаты";
    }
    if (!this.customer.address) {
      errors.address = "Необходимо указать адресс";
    }
    if (!this.customer.phone) {
      errors.phone = "Необходимо указать адресс";
    }
    if (!this.customer.email) {
      errors.email = "Необходимо указать адресс электронной почты";
    }
    return errors;
  }
}