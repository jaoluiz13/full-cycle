import { CreatedAt, Sequelize, UpdatedAt } from "sequelize-typescript"
import { ProductModel } from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id-value-object";
import ProductRepository from "./product.repository";

describe("Product repository unit tests", () => {
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
        const productRepository = new ProductRepository();

        const props = {
            id: new Id("1"),
            name: 'Product',
            description: 'Product description',
            purchasePrice: 10.00,
            stock: 10
        }

        const product = new Product(props);

        await productRepository.add(product);

        const productDb = await ProductModel.findOne({
            where: {
                id: product.id.id,
            }
        });

        expect(props.id.id).toEqual(productDb.dataValues.id);
        expect(props.name).toEqual(productDb.dataValues.name);
        expect(props.description).toEqual(productDb.dataValues.description);
        expect(props.purchasePrice).toEqual(productDb.dataValues.purchasePrice);
        expect(props.stock).toEqual(productDb.dataValues.stock);
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        const props = {
            id: '1',
            name: 'Product',
            description: 'Product description',
            purchasePrice: 10.00,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await ProductModel.create(props);

        const product = await productRepository.find(new Id('1'));

        expect(props.id).toEqual(product.id.id);
        expect(props.name).toEqual(product.name);
        expect(props.description).toEqual(product.description);
        expect(props.purchasePrice).toEqual(product.purchasePrice);
        expect(props.stock).toEqual(product.stock);
    });
});