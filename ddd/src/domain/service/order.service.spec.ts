import Customer from "../entity/customer/customer";
import Order from "../entity/order/order";
import OrderItem from "../entity/order/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer('c1', 'João');
        const item1 = new OrderItem('i1', 'item1', 10, 1, 'p1');
        //const order1 = new Order('o1', 'c1', [item1]);

        const order = OrderService.placeOrder(customer, [item1])

        expect(customer.rewardPoints).toBe(5);
        expect(order.getTotalOrder()).toBe(10);
    });

    it("should be able to sum all orders", () => {
        const item1 = new OrderItem('1', 'item1', 10, 1, '1');
        const order1 = new Order('1', '1', [item1]);
        const item2 = new OrderItem('2', 'item1', 20, 1, '2');
        const order2 = new Order('2', '2', [item2]);

        let total = OrderService.getTotalOrders([order1, order2]);
        expect(total).toBe(30);
    });
})