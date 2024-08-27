import OrderItem from "./order_item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;


    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.getTotalOrder();
        this.validate();
    }

    public getTotalOrder(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): Array<OrderItem> {
        return this._items;
    }

    get total(): number {
        return this._total;
    }

    public validate(): boolean {

        if (this._id.length === 0) {
            throw new Error('Id is required');
        }

        if (this._customerId.length === 0) {
            throw new Error('Customer id is required');
        }

        if (this._items.length === 0) {
            throw new Error('Order must have at least one item');
        }

        if (this._items.some((item) => item.quantity <= 0)) {
            throw new Error('Order item quantity must be greater than zero.');
        }

        return true;
    }

    public editQuantityItemsOrderItem(itemId: string, quantity: number) {
        this._items.forEach((item) => {
            if (item.id === itemId) {
                if (item.quantity > quantity) {
                    item.incrementQuantity(quantity - item.quantity);
                } else if (item.quantity < quantity) {
                    item.decreaseQuantity(item.quantity - quantity);
                } else {
                    item = undefined
                }
            }
        });
    }
}