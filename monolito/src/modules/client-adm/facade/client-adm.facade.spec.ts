import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/client-adm.factory";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id-value-object";

describe("Client Facade unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync({ force: true });

        const tables = await sequelize.getQueryInterface().showAllTables();
        console.log("Tabelas no banco de dados:", tables);
    });

    it("should create a client", async () => {

        const client = new Client({
            id: new Id('1'),
            name: 'Client',
            email: 'client@example.com',
            address: 'address'
        });

        const facade = ClientAdmFacadeFactory.create();

        await facade.add({
            id: client.id.id,
            name: client.name,
            address: client.address,
            email: client.email,
        });

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

    it("should find a client", async () => {

        const client = await ClientModel.create({
            id: '1',
            name: 'Client',
            email: 'client@example.com',
            address: 'address',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const facade = ClientAdmFacadeFactory.create();

        const findClient = await facade.find({ id: '1' });

        expect(findClient.address).toEqual(client.dataValues.address);
        expect(findClient.email).toEqual(client.dataValues.email);
        expect(findClient.name).toEqual(client.dataValues.name);
        expect(findClient.id).toEqual(client.dataValues.id);
    });

});