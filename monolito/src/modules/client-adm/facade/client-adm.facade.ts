import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export interface UseCasesProps {
    addClientUsecase: UseCaseInterface,
    findClienteUsecase: UseCaseInterface,
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _addClientUsecase: UseCaseInterface;
    private _findClienteUsecase: UseCaseInterface;

    constructor(useCasesProps: UseCasesProps) {
        this._addClientUsecase = useCasesProps.addClientUsecase;
        this._findClienteUsecase = useCasesProps.findClienteUsecase;
    };

    async add(dto: AddClientFacadeInputDto): Promise<void> {
        await this._addClientUsecase.execute(dto);
    }
    async find(dto: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findClienteUsecase.execute(dto);
    }

}