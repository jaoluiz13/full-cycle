import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id-value-object";

describe("Client repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("repository should find a client", async () => {
        const client = await ClientModel.create({
            id: '1',
            name: 'Client',
            email: 'client@example.com',
            address: 'address',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const repository = new ClientRepository();
        const findClient = await repository.find('1');

        expect(findClient.address).toEqual(client.dataValues.address);
        expect(findClient.email).toEqual(client.dataValues.email);
        expect(findClient.name).toEqual(client.dataValues.name);
        expect(findClient.id.id).toEqual(client.dataValues.id);
    });

    it("repository should create a client", async () => {

        const client = new Client({
            id: new Id('1'),
            name: 'Client',
            email: 'client@example.com',
            address: 'address'
        });

        const repository = new ClientRepository();
        await repository.add(client);

        const findClient = await ClientModel.findOne({
            where: {
                id: client.id.id,
            }
        });

        expect(findClient.dataValues.id).toEqual(client.id.id);
        expect(findClient.dataValues.name).toEqual(client.name);
        expect(findClient.dataValues.address).toEqual(client.address);
        expect(findClient.dataValues.email).toEqual(client.email);

    });

});