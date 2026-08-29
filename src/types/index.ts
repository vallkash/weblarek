export type ApiPostMethods = "POST" | "PUT" | "DELETE";
export type validateErrrors = Partial<Record<keyof IUser, string>>;
export type TPayment = "card" | "cash";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IItem {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number | null;
  description: string;
}

export interface IUser {
  payment: TPayment | "";
  address: string;
  email: string;
  phone: string;
}

export interface IItemstData {
  total: number;
  items: IItem[];
}

export interface IOrderData extends IUser {
  items: string[];
  total: number;
}

export interface IOrderResponse {
  id: string;
  total: number;
}