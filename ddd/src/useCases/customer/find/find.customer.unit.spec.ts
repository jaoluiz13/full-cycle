import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("1", "Joao");
const address = new Address("Rua", 1, '000070000', 'Macuco');
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findByName: jest.fn(),
        delete: jest.fn(),
    }
}

describe("Test find customer use case", () => {
    it("should find a customer unit test", async () => {

        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: '1',
        }

        const output = {
            id: '1',
            name: 'Joao',
            address: {
                street: 'Rua',
                number: 1,
                city: 'Macuco',
                zip: '000070000',
            }
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    });


    it("shouldnt find a customer unit test", async () => {

        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const useCase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: '1',
        }

        expect(async () => {
            return await useCase.execute(input);
        }).rejects.toThrow("Customer not found");
    });

});