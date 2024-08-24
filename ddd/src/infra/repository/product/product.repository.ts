import { where } from "sequelize";
import Product from "../../../domain/entity/product/product";
import ProductRespositoryInterface from "../../../domain/repository/product/product.repository.interface";
import ProductModel from "../../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRespositoryInterface {

    async findByName(name: string): Promise<Product> {
        let product = await ProductModel.findOne({
            where: { name }
        });

        return new Product(product.id, product.name, product.price);
    }

    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        })
    }
    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price
            },
            {
                where: { id: entity.id }
            }
        )
    }
    async delete(entity: Product): Promise<void> {
        await ProductModel.destroy({
            where: { id: entity.id }
        });
    }
    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({
            where: { id },
        });

        return new Product(product.id, product.name, product.price);
    }

    async findAll(): Promise<Product[]> {
        let products = await ProductModel.findAll();
        return products.map(product => new Product(product.id, product.name, product.price));

    }

}