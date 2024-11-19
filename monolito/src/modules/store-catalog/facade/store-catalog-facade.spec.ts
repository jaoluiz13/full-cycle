import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import Id from "../../@shared/domain/value-object/id-value-object";

describe("Product facade unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync({ force: true }); // Garante que as tabelas sejam recriadas
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("repository should find all products facade", async () => {
        await ProductModel.create({
            id: '1',
            name: 'product 1',
            description: 'product 1 description',
            salesPrice: 100
        });

        await ProductModel.create({
            id: '2',
            name: 'product 2',
            description: 'product 2 description',
            salesPrice: 200
        });

        const facade = StoreCatalogFacadeFactory.create();
        const result = await facade.findAll();

        expect(result.products.length).toBe(2);

        expect(result.products[0].id).toBe('1');
        expect(result.products[0].name).toBe('product 1');
        expect(result.products[0].description).toBe('product 1 description');
        expect(result.products[0].salesPrice).toBe(100);

        expect(result.products[1].id).toBe('2');
        expect(result.products[1].name).toBe('product 2');
        expect(result.products[1].description).toBe('product 2 description');
        expect(result.products[1].salesPrice).toBe(200);
    });


    it("repository should find a product facade", async () => {
        await ProductModel.create({
            id: '1',
            name: 'product 1',
            description: 'product 1 description',
            salesPrice: 100
        });

        const facade = StoreCatalogFacadeFactory.create();

        const result = await facade.find({
            id: '1'
        })

        expect(result.id.id).toBe('1');
        expect(result.name).toBe('product 1');
        expect(result.description).toBe('product 1 description');
        expect(result.salesPrice).toBe(100);
    });
});