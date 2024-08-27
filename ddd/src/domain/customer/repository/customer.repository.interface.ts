
import RepositoryInterface from "../../@shared/repository/repository.interface";
import Customer from "../entity/customer";

export default interface CustomerRespositoryInterface extends RepositoryInterface<Customer> {
    findByName(name: string): Promise<Customer>;
}