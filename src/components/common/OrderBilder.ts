import { IOrder } from "../../types";

export class OrderBuilder {
    private order: Partial<IOrder> = {}; // Частично собранный объект

    setPayment(payment: string): this {
        this.order.payment = payment;
        return this;
    }

    setEmail(email: string): this {
        this.order.email = email;
        return this;
    }

    setPhone(phone: string): this {
        this.order.phone = phone;
        return this;
    }

    setAddress(address: string): this {
        this.order.address = address;
        return this;
    }

    setTotal(total: number): this {
        this.order.total = total;
        return this;
    }

    setItems(items: string[]): this {
        this.order.items = items;
        return this;
    }

    build(): IOrder {
        if (!this.order.payment || !this.order.email || !this.order.phone || !this.order.address || !this.order.total || !this.order.items) {
            throw new Error('Все обязательные поля должны быть заполнены!');
        }
        return this.order as IOrder;
    }
}