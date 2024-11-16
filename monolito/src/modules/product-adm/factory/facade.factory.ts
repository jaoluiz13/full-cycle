import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../useCase/add-product/add-product.usecase";
import CheckStockUseCase from "../useCase/check-stock/check-stock.usecase";

export default class ProductAdmnFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const checkStockProductUseCase = new CheckStockUseCase(productRepository);

        const productFacade = new ProductAdmFacade({
            addProductUseCase: addProductUseCase,
            checkStockUseCase: checkStockProductUseCase
        });

        return productFacade;
    }
}