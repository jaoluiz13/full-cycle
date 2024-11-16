import Id from "../../../@shared/domain/value-object/id-value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { FindAProductInputDto } from "./find-product-dto";

export default class FindAProductUseCase implements UseCaseInterface {

    constructor(private productRepository: ProductGateway) { }

    async execute(findProductDto: FindAProductInputDto): Promise<any> {
        const product = await this.productRepository.find(findProductDto.id);
        return new Product({
            id: new Id(product.id.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        })
    }
}

