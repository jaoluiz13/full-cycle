import AddClienteUseCase from "./add-client-usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe('Add cliente use case unit test', () => {
    it("should add cliente", async () => {
        const repository = MockRepository();
        const usecase = new AddClienteUseCase(repository);

        const input = {
            id: '1',
            name: 'client',
            email: 'client@example.com',
            address: 'address'
        };

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBe(input.id);
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);
    });
});