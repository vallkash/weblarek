import { IApi, IItemstData, IOrderData, IOrderResponse } from "../types";

export class ApiRequest {
  protected api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getItems(): Promise<IItemstData> {
    return await this.api.get("/product/");
  }

  async postItems(customer: IOrderData): Promise<IOrderResponse> {
    return await this.api.post("/order/", customer);
  }
}