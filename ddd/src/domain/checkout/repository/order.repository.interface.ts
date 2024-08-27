
import RepositoryInterface from "../../@shared/repository/repository.interface";
import Order from "../entity/order";

export default interface OrderRespositoryInterface extends RepositoryInterface<Order> {
    findByName(name: string): Promise<Order>;
}