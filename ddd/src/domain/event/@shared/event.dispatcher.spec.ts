import CustomerAddressChangedEvent from "../customer/customer-address-changed-.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import ChangeAddressCreateCustomerHandler from "../customer/handler/change-address-customer.handler";
import Log1WhenCreateCustomerHandler from "../customer/handler/log1-created-customer-handler copy";
import Log2WhenCreateCustomerHandler from "../customer/handler/log2-created-customer-handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event.dispatcher";

describe("Domain events unit tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandler["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandler["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("it should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandler["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandler["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandler["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandler["ProductCreatedEvent"][1]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandler["ProductCreatedEvent"]).toBeUndefined();

    });

    it("should notify when product is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandler["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandler["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: 'ProductOne',
            description: 'ProductOne has been created',
            price: 1.99
        });

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should notify when a customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new Log1WhenCreateCustomerHandler();
        const eventHandler2 = new Log2WhenCreateCustomerHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandler["CustomerCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandler["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandler["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: 'ProductOne',
            description: 'ProductOne has been created',
            price: 1.99
        });

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should notify when a customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new ChangeAddressCreateCustomerHandler();

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandler["CustomerAddressChangedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandler["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerAddressChangedEvent({
            id: '1',
            nome: 'João Luiz',
            endereco: 'Rua das flores'
        });

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    });
})