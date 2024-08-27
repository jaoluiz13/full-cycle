
import { v4 as uuid } from "uuid";
import Order from "../entity/order";
import Customer from "../../customer/entity/customer";
import OrderItem from "../entity/order_item";

export default class OrderService {
    static getTotalOrders(orders: Array<Order>): number {
        let total = 0;
        orders.forEach(order => {
            total += order.getTotalOrder();
        });

        return total;
    }

    static placeOrder(customer: Customer, orderItems: Array<OrderItem>): Order {
        if (orderItems.length == 0) {
            throw new Error("Order must have at least one item");
        }

        const order = new Order(uuid(), customer.id, orderItems);
        customer.addRewardPoints(order.getTotalOrder() / 2);
        return order;
    }
}