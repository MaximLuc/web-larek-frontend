import './scss/styles.scss';

import {AuctionAPI} from "./components/AuctionAPI";
import { API_URL, CDN_URL } from './utils/constants';
import { AppState, CatalogChangeEvent, Product, ProductStore } from './components/AppData';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Card, CatalogItem, ProductPreview } from './components/common/Card';
import { IserverResponse } from './types/index';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { CardBasket } from './components/common/CardsBasket';
import { Model } from './components/base/Model';
import { Order } from './components/Order';
import { Contacts } from './components/common/Contacts';
import { OrderBuilder } from './components/common/OrderBilder';
import { Success } from './components/common/Success';
// import { ContactsForm } from './components/common/Form';

const api = new AuctionAPI(CDN_URL, API_URL);
const events = new EventEmitter();

events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');


const page = new Page(document.body,events)
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const appData = new AppState({}, events);

const order = new Order(cloneTemplate(orderTemplate),events)
const basket = new Basket(cloneTemplate(basketTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate),events)
const orderBuilder = new OrderBuilder();
const success = new Success(cloneTemplate(successTemplate),{onClick:()=>{
    console.log('click close')
    modal.close()
}});

// const contactsForm: ContactsForm | null = null;

events.on<CatalogChangeEvent>('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
            onClick: () => {
                events.emit('card:select', item);
            }
        });
        return card.render({
            id:item.id,
            title: item.title,
            image: item.image,
            description: item.description,
            category: item.category,
            price:item.price
            
        });
    });
    
});

events.on('order:next', () => {
    const paymentMethod = order.getPaymentMethod(); 
    const address = (order.getContainer().elements.namedItem('address') as HTMLInputElement).value;


    orderBuilder.setPayment(paymentMethod);
    orderBuilder.setAddress(address);
    modal.render({
        content: contacts.render({
            email: '',
            phone: '',
            valid: false,
            errors: []
        })
    });
});

events.on('order:open', () => {
    modal.render({
        content: order.render({
            address: '',
            valid: false, 
            errors: []    
        })
    });
});

events.on('contactsForm:submit',() => {
    const email = (contacts.getContainer().elements.namedItem('email') as HTMLInputElement).value;
    const phone = (contacts.getContainer().elements.namedItem('phone') as HTMLInputElement).value;


    orderBuilder.setEmail(email);
    orderBuilder.setPhone(phone);

    orderBuilder.setTotal(appData.getTotal()); 
    orderBuilder.setItems(appData.getIdBasketCard())

    try {
        const orderObject = orderBuilder.build();
        console.log('Финальный заказ:', orderObject);
        api.postOrder(orderObject).then(data=>{
            events.emit('order:response',data as IserverResponse)
        }).catch(
            error => {
                console.error(error);
            }
        )
    } catch (error) {
        console.error(error.message);
    }
});

events.on('order:response',((data:IserverResponse)=>{
    console.log(data);
    modal.render({
        content: success.render({
            total:data.total
        })

    })
    appData.clearBasket()
    page.resetCounter()
}))


events.on('basket:open', () => {
    modal.render({
        content:

            basket.render({
                items:appData.basket.map(item =>item.getContainer()),
                total:appData.getTotal(),
            })

    });
});

events.on("items:delete",(item:CardBasket)=>{
    if (item && item.id !== undefined) {
        appData.deleteItemBasket(item);
        appData.setIdCartItem();
        page.dicrementCounter();
    } else {
        console.error('Item is undefined or does not have an id:', item);
    }
    events.emit('basket:open');
})

events.on('card:select', (item: Product) => {
    appData.setPreview(item);
});

api.getProductList()
    .then(appData.setCatalog.bind(appData))
    .catch(err => {
        console.error(err);
    });

events.on('preview:changed', (item: Product) => {
    const showItem = (item:Product)=>{
        const card = new ProductPreview(cloneTemplate(cardPreviewTemplate),{
            onSubmit:()=> {
                const added:boolean = appData.addBasketCard(item,cardBasketTemplate)
                if(added){
                    page.incrementCounter()
                }
            },
        });
        card.setProductData({
            id:item.id,
            title: item.title,
            image: item.image,
            description: item.description,
            price: item.price, 
            category: item.category || 'другое' 
        });

        modal.render({
            content: card.render() 
        });


    }
    showItem(item);
});

events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});