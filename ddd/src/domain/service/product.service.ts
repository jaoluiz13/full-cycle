import Product from "../entity/product/product";

export default class ProductService {

    static increasePrice(products: Array<Product>, percentage: number) {
        products.forEach(product => {
            product.changePrice((product.price * (percentage / 100)) + product.price)
        });

        return products;
    }
}