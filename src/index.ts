import './scss/styles.scss';

import {AuctionAPI} from "./components/AuctionAPI";
import { API_URL, CDN_URL } from './utils/constants';
import { Product, ProductStore } from './components/AppData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card } from './components/common/Card';
import { IProduct } from './types';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { Modal } from './components/common/Modal';

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


async function init() {
    const FProductStore = new ProductStore(api);
    await FProductStore.loadProducts(); 


    const products: Product[] = FProductStore.getAllProducts();

    products.forEach(item=>{
        const card = new Card(cloneTemplate(cardCatalogTemplate), events);
        card.setProduct(item)
        gallery.appendChild(card.getContainer());
    })

}

events.on('card:open', () => {
    console.log('data')
});


init();