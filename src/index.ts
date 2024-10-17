import './scss/styles.scss';

import {AuctionAPI} from "./components/AuctionAPI";
import { API_URL, CDN_URL } from './utils/constants';
import { ProductStore } from './components/AppData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card } from './components/common/Card';
import { IProduct } from './types';

const api = new AuctionAPI(CDN_URL, API_URL);


const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const gallery = document.querySelector('.gallery');

const main = document.querySelector('.gallery')



async function init() {
    const FProductStore = new ProductStore(api);
    await FProductStore.loadProducts(); 


    const products: IProduct[] = FProductStore.getAllProducts();

    products.forEach(item=>{
        const card = new Card(cloneTemplate(cardCatalogTemplate));
        card.setProduct(item)
        gallery.appendChild(card.getContainer());
    })

}



init();