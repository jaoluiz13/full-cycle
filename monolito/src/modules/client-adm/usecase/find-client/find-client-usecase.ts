import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.dto";

export default class FindClientUseCase {
    private _clientRepository: ClientGateway;
    constructor(_clientRepository: ClientGateway) {
        this._clientRepository = _clientRepository;
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        let client = await this._clientRepository.find(input.id);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}