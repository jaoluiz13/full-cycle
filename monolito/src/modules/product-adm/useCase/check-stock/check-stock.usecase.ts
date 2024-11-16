import Id from "../../../@shared/domain/value-object/id-value-object";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase {

    private _productRepository;
    constructor(_productRepository: ProductGateway) {
        this._productRepository = _productRepository;
    }

    async execute(dto: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this._productRepository.find(new Id(dto.productId));
        return { productId: product.id.id, stock: product.stock };
    }
}