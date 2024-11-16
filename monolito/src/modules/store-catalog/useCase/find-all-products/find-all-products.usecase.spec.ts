import Id from "../../../@shared/domain/value-object/id-value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product1 = new Product({
    id: new Id('1'),
    name: 'product 1',
    description: 'product 1 description',
    salesPrice: 100
});

const product2 = new Product({
    id: new Id('2'),
    name: 'product 2',
    description: 'product 2 description',
    salesPrice: 200
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
    }
}

describe("find all products use case unit test", () => {
    it("should find all catalog products", async () => {
        const productRepository = MockRepository();
        const usecase = new FindAllProductsUseCase(productRepository);

        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();

        expect(result.products.length).toBe(2);

        expect(result.products[0].id).toBe('1');
        expect(result.products[0].name).toBe('product 1');
        expect(result.products[0].description).toBe('product 1 description');
        expect(result.products[0].salesPrice).toBe(100);

        expect(result.products[1].id).toBe('2');
        expect(result.products[1].name).toBe('product 2');
        expect(result.products[1].description).toBe('product 2 description');
        expect(result.products[1].salesPrice).toBe(200);


    });
})
