import { Api, ApiListResponse } from './base/api';
import {IProduct, IOrder} from "../types/index";
import { Product } from './AppData';


export interface IAuctionAPI {
    getProductList: () => Promise<Product[]>;
    getProductItem: (id: string) => Promise<Product>;
    postOrder: (id: string, order: IOrder) => Promise<string>;
}

export class AuctionAPI extends Api implements IAuctionAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductItem(productId: string): Promise<Product> {
        return this.get(`/product/${productId}`).then(
            (item: Product) => ({
                ...item,
                image: this.cdn + item.image,
                events: {}, 
                emitChanges: () => {}, 
            })
        );
    }

    getProductList(): Promise<Product[]> {
        return this.get('/product').then((data: ApiListResponse<Product>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image,
                events: {}, 
                emitChanges: () => {}, 
            }))
        );
    }

    postOrder(id: string, order: IOrder): Promise<string> {
        return this.post(`/order`, order).then
            ((data: { id: string }) => data.id
        );
    }

}