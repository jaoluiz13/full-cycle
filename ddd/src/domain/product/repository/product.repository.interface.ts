import Product from "../entity/product";
import RepositoryInterface from "../../@shared/repository/repository.interface";

export default interface ProductRespositoryInterface extends RepositoryInterface<Product> {
    findByName(name: string): Promise<Product>;
}