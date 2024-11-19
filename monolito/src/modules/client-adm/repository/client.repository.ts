import { Model } from "sequelize-typescript";
import ClientGateway from "../gateway/client.gateway";
import Client from "../domain/client.entity";
import ClientModel from "./client.model";
import Id from "../../@shared/domain/value-object/id-value-object";

export default class ClientRepository implements ClientGateway {

    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            address: client.address,
            email: client.email,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });

    }
    async find(id: string): Promise<Client> {
        const client = await ClientModel.findOne({
            where: { id }
        });

        return new Client({
            id: new Id(client.dataValues.id),
            address: client.dataValues.address,
            email: client.dataValues.email,
            name: client.dataValues.name
        });
    }

}