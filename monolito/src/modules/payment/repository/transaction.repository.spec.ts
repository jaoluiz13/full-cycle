import { Sequelize } from "sequelize-typescript";
import TransactionModel from "./transaction.model";
import Id from "../../@shared/domain/value-object/id-value-object";
import Transaction from "../domain/transaction";
import TransactionRepository from "./transaction.repository";

describe("Transaction repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        });

        sequelize.addModels([TransactionModel]);
        await sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should save a transaction", async () => {
        const transaction = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: '1'
        });

        transaction.aprove();

        const repository = new TransactionRepository();
        const result = await repository.save(transaction);

        expect(result.id.id).toEqual(transaction.id.id);
        expect(result.amount).toEqual(transaction.amount);
        expect(result.status).toEqual(transaction.status);
        expect(result.orderId).toEqual(transaction.orderId);


    });
});