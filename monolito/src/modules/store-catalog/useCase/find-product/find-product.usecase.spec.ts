import Id from "../../../@shared/domain/value-object/id-value-object";
import Product from "../../domain/product.entity";
import FindAProductUseCase from "./find-product.usecase";


const product1 = new Product({
    id: new Id('1'),
    name: 'product 1',
    description: 'product 1 description',
    salesPrice: 100
});


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product1)),
        findAll: jest.fn()
    }
}

describe("find a products use case unit test", () => {
    it("should find a catalog product by id", async () => {
        const productRepository = MockRepository();
        const usecase = new FindAProductUseCase(productRepository);

        const result = await usecase.execute({ id: '1' });

        expect(productRepository.find).toHaveBeenCalled();

        expect(result.id.id).toBe('1');
        expect(result.name).toBe('product 1');
        expect(result.description).toBe('product 1 description');
        expect(result.salesPrice).toBe(100);

    });
})
