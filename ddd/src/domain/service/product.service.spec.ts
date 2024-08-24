import Product from "../entity/product/product";
import ProductService from "./product.service";

describe("Product services unit tests", () => {
    it("should change the prices of all products", () => {
        const produc1 = new Product('1', 'Product 1', 10);
        const produc2 = new Product('2', 'Product 2', 20);
        const products = [produc1, produc2];

        ProductService.increasePrice(products, 100);

        expect(produc1.price).toBe(20);
        expect(produc2.price).toBe(40);

    })
});