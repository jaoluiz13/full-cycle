import Customer from "../../entity/customer/customer";
import RepositoryInterface from "../repository.interface";

export default interface CustomerRespositoryInterface extends RepositoryInterface<Customer> {
    findByName(name: string): Promise<Customer>;
}