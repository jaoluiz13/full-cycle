import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("Name is required");
    });

    it("it should change name", () => {
        const customer = new Customer("1", "João Luiz");
        customer.changeName("Jão");

        expect(customer.name).toEqual("Jão");
    });

    it("it should throw error when customer address doesn't exists", () => {
        expect(() => {
            const customer = new Customer("1", "João Luiz");
            customer.activate();
        }).toThrowError('Address is mandatory to activate a customer');
    });

    it("it should activate customer", () => {
        const customer = new Customer("1", "João Luiz");
        const address = new Address('Rua das Pedras', 6, '3367000', 'Leopoldina');
        customer.setAddress(address);
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("it should deactivate customer", () => {
        const customer = new Customer("1", "João Luiz");
        const address = new Address('Rua das Pedras', 6, '3367000', 'Leopoldina');
        customer.setAddress(address);
        customer.activate();
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it('should add reward points', () => {
        const customer = new Customer('c1', 'João');
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });


});