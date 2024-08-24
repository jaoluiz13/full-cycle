import Product from "../../entity/product/product";
import RepositoryInterface from "../repository.interface";

export default interface ProductRespositoryInterface extends RepositoryInterface<Product> {
    findByName(name: string): Promise<Product>;
}