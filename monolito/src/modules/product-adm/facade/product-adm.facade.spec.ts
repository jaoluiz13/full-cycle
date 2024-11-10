import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../useCase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
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

    it("should create a product", async () => {

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
});