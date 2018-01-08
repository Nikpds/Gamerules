export class Customer {
    customer_id: number;
    customer_group_id: number;
    store_id: number;
    language_id: number;
    firstname: string;
    lastname: string;
    email: string;
    telephone: string;
    fax: string;
    newsletter: string;
    address_id: number;
    date_added: Date;
    oc_Address: Address;
    oc_Orders: Array<Order>;

    constructor() {
        this.oc_Orders = new Array<Order>();
    }

}

export class Order {
    order_id: number;
    firstname: string;
    lastname: string;
    email: string;
    telephone: string;
    date_added: Date;
    date_modified: Date;
    comment: string;
    total: number;
    payment_method: string;
    shipping_method: string;
    order_products: Array<OrderProduct>;
    order_status_id: number;
    oc_OrderStatus: OcOrderStatus;

    constructor() {
        this.order_products = new Array<OrderProduct>();
        this.oc_OrderStatus = new OcOrderStatus();
    }

}

export class OrderProduct {
    order_product_id: number;
    order_id: number;
    product_id: number;
    name: string;
    model: string;
    quantity: number;
    price: number;
    total: number;
    tax: number;
    reward: number;
    product_status: number;

}

export class Address {
    address_id: number;
    customer_id: number;
    firstname: string;
    lastname: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country_Id: number;
    zone_id: number;
}

export class OcOrderStatus {
    order_status_id: number;
    language_id: number;
    name: string;
    oc_orders: Array<Order>;

    constructor() {
        this.oc_orders = new Array<Order>();
    }
}

export class Counter {
    orders: number;
    products: number;
    customers: number;
    orderProducts: number;
}
