import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            new Order('', '1', []);
        }).toThrowError('Id is required');
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            new Order('1', '', []);
        }).toThrowError('Customer id is required');
    });

    it("should throw error when there are not items", () => {
        expect(() => {
            new Order('1', '1', []);
        }).toThrowError('Order must have at least one item');
    });

    it("should throw error when quantity is equal or lower than 0", () => {
        expect(() => {
            //new OrderItem('1', 'Item 1', 10, 0, 'p1');
            const orderItem1 = new OrderItem('1', 'Item 1', 10, 1, 'p1');
            const orderItem2 = new OrderItem('2', 'Item 2', 10, 0, 'p1');
            let order = new Order('1', '1', [orderItem1, orderItem2]);
        }).toThrowError('Order item quantity must be greater than zero.');
    });

    it("should calculate total", () => {

        const orderItem1 = new OrderItem('1', 'Item 1', 10, 1, 'p1');
        const orderItem2 = new OrderItem('2', 'Item 2', 10, 1, 'p1');
        let order = new Order('1', '1', [orderItem1, orderItem2]);

        expect(order.getTotalOrder()).toEqual(20);
    });

});