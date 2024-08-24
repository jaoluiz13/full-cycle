import { where } from "sequelize";
import Order from "../../../domain/entity/order/order";
import OrderItem from "../../../domain/entity/order/order_item";
import OrderRespositoryInterface from "../../../domain/repository/order/order.repository.interface";
import OrderItemModel from "../../db/sequelize/model/order.item.model";
import OrderModel from "../../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRespositoryInterface {
    findByName(name: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.getTotalOrder(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.getTotalOrder(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                where: { id: entity.id },
            }
        )
    }

    async delete(entity: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async find(id: string): Promise<Order> {
        const order = await OrderModel.findOne({
            where: {
                id
            },
            include: [{ model: OrderItemModel }]
        });


        const orderItems = order.items.map((item) => new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id));
        return new Order(order.id, order.customer_id, orderItems);
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });

        return orders.map(order =>
            new Order(
                order.id,
                order.customer_id,
                order.items.map((item) =>
                    new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id)
                )
            )
        );
    }

}