import StoreCatalogFacade from "../facade/store-catalog-facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../useCase/find-all-products/find-all-products.usecase";
import FindAProductUseCase from "../useCase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacade {

        const productRepository = new ProductRepository();
        const findProductUseCase = new FindAProductUseCase(productRepository);
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);

        return new StoreCatalogFacade({ findAllProductsUseCase, findProductUseCase });
    }
}