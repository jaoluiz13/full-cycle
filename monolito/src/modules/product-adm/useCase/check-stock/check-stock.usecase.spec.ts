import Id from "../../../@shared/domain/value-object/id-value-object";
import Product from "../../domain/product.entity";
import AddProductUseCase from "../add-product/add-product.usecase";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
    description: "product test desc",
    name: "product test",
    purchasePrice: 1.00,
    stock: 20,
    id: new Id('1')
});

const MockRepository = () => {

    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}


describe("Check a product stock quantity", () => {
    it("should  add a product", async () => {
        const productRepository = MockRepository();
        let checkStockUseCase = new CheckStockUseCase(productRepository);
        const input = {
            productId: '1'
        }
        const result = await checkStockUseCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();

        expect(result.stock).toBe(product.stock);
        expect(result.productId).toBe(input.productId);
    });
});