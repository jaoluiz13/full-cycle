import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClienteUseCase from "../usecase/add-client/add-client-usecase";
import FindClientUseCase from "../usecase/find-client/find-client-usecase";

export default class ClientAdmFacadeFactory {
    static create() {
        const clientRepository = new ClientRepository();
        const addClientUsecase = new AddClienteUseCase(clientRepository);
        const findClienteUsecase = new FindClientUseCase(clientRepository);

        const facade = new ClientAdmFacade({
            addClientUsecase: addClientUsecase,
            findClienteUsecase: findClienteUsecase
        });

        return facade;
    }
}