import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCasesProps {
    findAllProductsUseCase: UseCaseInterface,
    findProductUseCase: UseCaseInterface,
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private _findAllProductsUseCase: UseCaseInterface;
    private _findProductUseCase: UseCaseInterface;

    constructor(useCasesProps: UseCasesProps) {
        this._findAllProductsUseCase = useCasesProps.findAllProductsUseCase;
        this._findProductUseCase = useCasesProps.findProductUseCase;
    };


    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findProductUseCase.execute(id);
    }
    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllProductsUseCase.execute({});
    }

}
