import Order from "../order/order";
import OrderItem from "../order/order_item";
import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let prodcut = new Product("", "Product 1", 20);
        }).toThrowError('Product id is required');
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let prodcut = new Product("1", "", 20);
        }).toThrowError('Product name is required');
    });

    it("should throw error when price is equal or lower than 0", () => {
        expect(() => {
            let prodcut = new Product("1", "Product 1", 0);
        }).toThrowError('Product price must be greater than 0');
    });

    it("should change product name", () => {
        let product = new Product("1", "Product 1", 1);
        product.changeName('Product 1 Modified');
        expect(product.name).toEqual('Product 1 Modified');
    });

    it("should throw a error when change product name to a empty name", () => {

        expect(() => {
            let product = new Product("1", "Product 1", 1);
            product.changeName('');
        }).toThrowError('Product name is required');
    });

    it("should change product price", () => {
        let product = new Product("1", "Product 1", 1);
        product.changePrice(2);
        expect(product.price).toEqual(2);
    });

    it("should throw a error when change product price to a price equal or lower than 0", () => {

        expect(() => {
            let product = new Product("1", "Product 1", 10);
            product.changePrice(-1);
        }).toThrowError('Product price must be greater than 0');
    });



});