import Id from "../../../@shared/domain/value-object/id-value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase {

    private _productRepository;
    constructor(_productRepository: ProductGateway) {
        this._productRepository = _productRepository;
    }

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        }

        this._productRepository.add(new Product(props));
        return { ...props, createdAt: new Date(), updatedAt: new Date() };
    }
}