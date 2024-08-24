export default class Product {
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    public validate(): boolean {
        if (this._id.length === 0) {
            throw new Error('Product id is required');
        }

        if (this._name.length === 0) {
            throw new Error('Product name is required');
        }

        if (this._price <= 0) {
            throw new Error('Product price must be greater than 0');
        }

        return true;
    }

    public changeName(name: string) {
        if (name.length == 0) {
            throw new Error('Product name is required');
        }
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    public changePrice(price: number) {
        if (price <= 0) {
            throw new Error('Product price must be greater than 0');
        }

        this._price = price;
    }

    get price() {
        return this._price;
    }
}