import Order from "../../entity/order/order";
import RepositoryInterface from "../repository.interface";

export default interface OrderRespositoryInterface extends RepositoryInterface<Order> {
    findByName(name: string): Promise<Order>;
}