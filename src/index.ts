import './scss/styles.scss';

import {AuctionAPI} from "./components/AuctionAPI";
import { API_URL, CDN_URL } from './utils/constants';
import { AppState, CatalogChangeEvent, Product, ProductStore } from './components/AppData';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Card, CatalogItem, ProductPreview } from './components/common/Card';
import { IProduct } from './types';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { CardBasket } from './components/common/CardsBasket';
import { Model } from './components/base/Model';

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
const gallery = document.querySelector('.gallery');

const page = new Page(document.body,events)
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const appData = new AppState({}, events);


const basket = new Basket(cloneTemplate(basketTemplate), events);
// const card_basket = new CardBasket(cloneTemplate(cardBasketTemplate),{onClick:()=>{
//     console.log('card basket click');
// }})
events.on<CatalogChangeEvent>('items:changed', () => {
    console.log(appData.catalog)
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



events.on('basket:open', () => {
    modal.render({
        content:

            basket.render({
                items:appData.basket.map(item =>item.getContainer())
            })

    });
});

events.on("items:delete",(item:CardBasket)=>{
    if (item && item.id !== undefined) {
        appData.deleteItemBasket(item);
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
                appData.addBasketCard(item,cardBasketTemplate)
                page.incrementCounter()
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