import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => {
    return { add: jest.fn(), find: jest.fn() }

}

describe("Add product use case unit tests", () => {
    it("should  add a product", async () => {
        const productRepository = MockRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);

        const input = {
            name: 'Product',
            description: 'Product description',
            purchasePrice: 10.00,
            stock: 10
        }

        const result = await addProductUseCase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.purchasePrice).toBe(input.purchasePrice);
        expect(result.stock).toBe(input.stock);
    });
});