import "./scss/styles.scss";
import { User } from "./components/Models/User";
import { Cart } from "./components/Models/Cart";
import { Catalog } from "./components/Models/Catalog";
import { apiProducts } from "./utils/data";
import { ApiRequest } from "./components/ApiRequest";
import { Api } from "./components/base/Api";
import { API_URL, CDN_URL } from "./utils/constants";
import { Gallery } from "./components/View/Gallery";
import { Header } from "./components/View/Header";
import { ModalView } from "./components/View/ModalView";
import { Basket } from "./components/View/Basket";
import { CardBasket } from "./components/View/Cards/CardBasket";
import { CardCatalog } from "./components/View/Cards/CardCatalog";
import { CardPreview } from "./components/View/Cards/CardPreview";
import { PayForm } from "./components/View/Forms/PayForm";
import { ContactsForm } from "./components/View/Forms/ContactsForm";
import { Success } from "./components/View/Forms/Success";
import { ensureElement, ensureAllElements, cloneTemplate } from "./utils/utils";
import { EventEmitter } from "./components/base/Events";
import { IItem, TPayment } from "./types";

const events = new EventEmitter();

const cartModel = new Cart(events);
const catalogModel = new Catalog(events);
const userModel = new User(events);

const baseApi = new Api(API_URL);
const weblarekApi = new ApiRequest(baseApi);

async function loadProducts() {
    try {
        const data = await weblarekApi.getItems();
        console.log(data);
        catalogModel.setItems(data.items);
    } catch (err) {
        console.error('Ошибка загрузки товаров:', err);
    }
}

const header = new Header(ensureElement<HTMLElement>('.header'), events);
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const modal = new ModalView(ensureElement<HTMLElement>('.modal'));

const basket = new Basket(cloneTemplate<HTMLElement>('#basket'), events);
const payForm = new PayForm(cloneTemplate<HTMLElement>('#order'), events);
const contactsForm = new ContactsForm(cloneTemplate<HTMLElement>('#contacts'), events);
const success = new Success(cloneTemplate<HTMLElement>('#success'), events);

events.on('catalog: changed', () => {
  gallery.catalog = catalogModel.getItems().map((item) => {
    const cardCatalog = new CardCatalog(cloneTemplate<HTMLElement>('#card-catalog'), events);
    return cardCatalog.render(item);
  })
});

events.on('cart: changed', () => {
  header.counter = cartModel.getAmount();

  const items = cartModel.getSelectedItems();

  const cards = items.map((item, index) => {
    const cardBasket = new CardBasket(cloneTemplate<HTMLElement>('#card-basket'), events);
    cardBasket.index = index + 1;
    return cardBasket.render({index, title: item.title, price: item.price, id: item.id});
  });

  basket.items = cards ;
  basket.price = cartModel.getTotal();
  basket.disabled = items.length === 0;
});

events.on('user: changed', () => {
  const errors = userModel.validateCustomerData();
  const errorList = Object.values(errors);
  payForm.render(userModel.getCustomerData()); 
  payForm.error = errorList;
  if (!errors) {
    payForm.disabled = false;
  } else {
    payForm.disabled = true;
  }
});

events.on('selectedItem: changed', () => {
  const item = catalogModel.getItem();
  const cardPreview = new CardPreview(cloneTemplate<HTMLElement>('#card-preview'), events);
  
  let buttonText: string;
  let isDisabled: boolean;
  
  if (item?.price === null) {
    buttonText = "Недоступно";
    isDisabled = true;
  } else if (cartModel.isPresent(item!.id)) {
    buttonText = "Удалить из корзины";
    isDisabled = false;
  } else {
    buttonText = "В корзину";
    isDisabled = false;
  }
  modal.content = cardPreview.render({
    category: item!.category,
    image: item!.image,
    description: item!.description,
    price: item!.price,
    title: item!.title,
    buttonText,
    isDisabled
  });
  modal.open();
});

events.on('card: selected', (data: { title: string }) => {
  const allItems = catalogModel.getItems();
  const title = data.title;
  const items: IItem[] = allItems.filter(i => i.title === title);
  catalogModel.setItem(items[0]);
});

events.on('card: bought', () => {
  
  const item = catalogModel.getItem();
  console.log(item);
   
  cartModel.addSelectedItem(item!);
  modal.close();
});

events.on('card: deleted', (data: {id: string}) => {
  cartModel.deleteSelectedItem(data.id);
});

events.on('basket: opened', () => {
  modal.content = basket.render();
  modal.open();  
});

events.on('order: issued', () => {
  modal.content = payForm.render();
  modal.open(); //возможно лишнее т.к. когда событие всегда случается когда модальное окно открыто
});

events.on('form: onward', () => {
  modal.content = contactsForm.render();
  modal.open(); //возможно лишнее т.к. когда событие всегда случается когда модальное окно открыто
});

events.on('form: finished', () => {
  modal.content = success.render();
  modal.open(); //возможно лишнее т.к. когда событие всегда случается когда модальное окно открыто
})

events.on('gallery: returned', () => {
  modal.close;
});

events.on('form: changed', (data: { field: string; value: string }) => {
  if (data.field === 'address') {
        userModel.setAdress(data.value);
    } if (data.field === 'payment') {
        userModel.setPayment(data.value as TPayment);
    } if (data.field === 'email') {
        userModel.setEmail(data.value);
    } if (data.field === 'phone') {
        userModel.setPhone(data.value);
    }
});

loadProducts();