import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductAdmnFacadeFactory from "../factory/facade.factory";

describe("Product adm facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("facade should create a product ", async () => {

        const productFacade = ProductAdmnFacadeFactory.create();

        const input = {
            id: '1',
            name: 'Product',
            description: 'Product description',
            purchasePrice: 10.00,
            stock: 10,
        };

        await productFacade.addProduct(input);

        const productDB = await ProductModel.findOne({
            where: { id: "1" }
        });

        expect(productDB).toBeDefined();

        expect(input.id).toEqual(productDB.dataValues.id);
        expect(input.name).toEqual(productDB.dataValues.name);
        expect(input.description).toEqual(productDB.dataValues.description);
        expect(input.purchasePrice).toEqual(productDB.dataValues.purchasePrice);
        expect(input.stock).toEqual(productDB.dataValues.stock);
    })

    it("facade should check stock of a product ", async () => {

        const productFacade = ProductAdmnFacadeFactory.create();

        const input = {
            id: '1',
            name: 'Product',
            description: 'Product description',
            purchasePrice: 10.00,
            stock: 10,
        };

        await productFacade.addProduct(input);

        const product = await productFacade.checkStock({ productId: input.id });

        expect(product.productId).toBe(input.id);
        expect(product.stock).toBe(input.stock);

    })
});