export default class OrderItem {
    private _id: string;
    private _name: string;
    private _price: number;
    private _quantity: number;
    private _productId: string;

    constructor(id: string, name: string, price: number, quantity: number, productId: string) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._productId = productId;

        this.validate()
    }

    public validate() {
        if (this._quantity <= 0) {
            throw new Error('Order item quantity must be greater than zero.');
        }
    }

    public decreaseQuantity(quantity: number) {
        this._quantity -= quantity;
    }

    public incrementQuantity(quantity: number) {
        this._quantity += quantity;
    }

    get price(): number {
        return this._price;
    }

    get quantity(): number {
        return this._quantity;
    }

    get name(): string {
        return this._name;
    }

    get productId(): string {
        return this._productId;
    }

    get id(): string {
        return this._id;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }
}