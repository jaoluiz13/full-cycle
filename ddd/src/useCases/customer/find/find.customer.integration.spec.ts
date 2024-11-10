import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {

        const customer = new Customer("1", "Joao");
        const address = new Address("Rua", 1, '000070000', 'Macuco');
        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

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


})