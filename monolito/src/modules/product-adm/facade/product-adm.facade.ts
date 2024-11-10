import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmnFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto } from "./product-adm.facade.interface";

export interface UseCasesProps {
    addProductUseCase: UseCaseInterface,
    checkStockUseCase: UseCaseInterface,
}

export default class ProductAdmFacade implements ProductAdmnFacadeInterface {

    private _addProductUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(useCasesProps: UseCasesProps) {
        this._addProductUseCase = useCasesProps.addProductUseCase;
        this._checkStockUseCase = useCasesProps.checkStockUseCase;
    };

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addProductUseCase.execute(input);
    }
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeInputDto> {
        return this._checkStockUseCase.execute(input);
    }

}