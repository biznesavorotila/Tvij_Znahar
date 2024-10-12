import { dataSource } from "../../../database/data-source";
import { CartEntity } from "../../../database/entity/cart.entity";
import { ProductEntity } from "../../../database/entity/product.entity";
import { TProductCreate } from "./types";

class ProductService {
    async create(newProduct: TProductCreate) {
        return await dataSource.getRepository(ProductEntity).save(newProduct);
    }

    async getAll() {
        return await dataSource.getRepository(ProductEntity)
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.parent', 'parent')
            .getMany();
    }

    async getProduct(id: number) {
        return await dataSource.getRepository(ProductEntity)
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.parent', 'parent')
            .where({ id })
            .getOneOrFail();
    }

    async update(productId: number, update: Partial<TProductCreate>) {
        return await dataSource.getRepository(ProductEntity).save({ ...update, id: productId });
    }

    async deleteProduct(productId: number) {
        // delete cart
        await dataSource.getRepository(CartEntity)
            .createQueryBuilder('cart')
            .where('cart.productId = :productId', { productId })
            .delete();

        await dataSource.getRepository(ProductEntity).delete({ id: productId });
    }
}

export default new ProductService();