import Id from "../../@shared/domain/value-object/id-value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {

        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    async find(id: Id): Promise<Product> {
        const product = await ProductModel.findOne({
            where: { id: id.id }
        });

        if (!product) {
            throw new Error("Product not found");
        }

        return new Product({
            id: new Id(product.dataValues.id),
            name: product.dataValues.name,
            description: product.dataValues.description,
            stock: product.dataValues.stock,
            purchasePrice: product.dataValues.purchasePrice,
        });
    }

}