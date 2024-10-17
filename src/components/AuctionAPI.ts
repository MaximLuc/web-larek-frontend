import { Api, ApiListResponse } from './base/api';
import {IProduct, IOrder} from "../types/index";


export interface IAuctionAPI {
    getProductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
    postOrder: (id: string, order: IOrder) => Promise<string>;
}

export class AuctionAPI extends Api implements IAuctionAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductItem(productId: string): Promise<IProduct> {
        return this.get(`/product/${productId}`).then(
            (item: IProduct) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    getProductList(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    postOrder(id: string, order: IOrder): Promise<string> {
        return this.post(`/order`, order).then
            ((data: { id: string }) => data.id
        );
    }

}