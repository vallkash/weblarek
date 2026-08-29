import "./scss/styles.scss";
import { User } from "./components/Models/User";
import { Cart } from "./components/Models/Cart";
import { Catalog } from "./components/Models/Catalog";
import { apiProducts } from "./utils/data";
import { ApiRequest } from "./components/ApiRequest";
import { Api } from "./components/base/Api";
import { API_URL, CDN_URL } from "./utils/constants";

const catalogModel = new Catalog();
catalogModel.setItems(apiProducts.items);
console.log(`Массив товаров из каталога: `, catalogModel.getItems());

const cartModel = new Cart();
cartModel.addSelectedItem(apiProducts.items[0]);
cartModel.addSelectedItem(apiProducts.items[3]);
console.log(
  `В корзине`,
  cartModel.getAmount(),
  `шт. товаров, на сумму:`,
  cartModel.getTotal(),
);

const userModel = new User();
userModel.setAdress("г.Хабаровск ул.Ленина");
userModel.setPayment("card");
userModel.setPhone("8 800 555 35 35");
console.log(`Данные пользователя:`, userModel.getCustomerData());
console.log(`Нашли ошибки:`, userModel.validateCustomerData());

const baseApi = new Api(API_URL);
const tryRequest = new ApiRequest(baseApi);

tryRequest
  .getItems()
  .then((data) => {
    catalogModel.setItems(data.items);
    console.log(`Новый каталог после запроса:`, catalogModel.getItems());
  })
  .catch((err) => {
    console.error(`Ошибка загрузки товаров`, err);
  });