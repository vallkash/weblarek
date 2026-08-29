import { IUser, validateErrrors, TPayment } from "../../types";

export class User {
  protected customer: IUser = {
    payment: "",
    email: "",
    phone: "",
    address: "",
  };

  constructor() {}

  setPayment(payment: TPayment | ""): void {
    this.customer.payment = payment;
  }

  setAdress(address: string): void {
    this.customer.address = address;
  }

  setPhone(phone: string): void {
    this.customer.phone = phone;
  }

  setEmail(email: string): void {
    this.customer.email = email;
  }

  getCustomerData(): IUser {
    return this.customer;
  }

  clearCustomerData(): void {
    this.customer.payment = "";
    this.customer.address = "";
    this.customer.phone = "";
    this.customer.email = "";
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