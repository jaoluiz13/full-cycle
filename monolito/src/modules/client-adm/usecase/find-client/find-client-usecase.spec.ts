import Id from "../../../@shared/domain/value-object/id-value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client-usecase";

const client = new Client({
    id: new Id('1'),
    name: 'joao',
    address: 'a',
    email: 'joao@example.com'
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    }
}

describe("Add client use case unit test", () => {
    it("should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);

        const clientResult = await usecase.execute({ id: client.id.id });

        expect(repository.find).toHaveBeenCalled();
        expect(clientResult.id).toBeDefined();
        expect(clientResult.name).toEqual(client.name);
        expect(clientResult.email).toEqual(client.email);
        expect(clientResult.address).toEqual(client.address);

    })
});