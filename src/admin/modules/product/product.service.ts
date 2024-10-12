import { dataSource } from "../../../database/data-source";
import { CartEntity } from "../../../database/entity/cart.entity";
import { ProductEntity } from "../../../database/entity/product.entity";
import { TProductCreate } from "./types";

class ProductService {
    async create(newProduct: TProductCreate) {
        return await dataSource.getRepository(ProductEntity).save({
            ...newProduct,
            parent: { id: newProduct.product_id }
        });
    }

    async getAll(isCatalog?: boolean | undefined) {
        const query = await dataSource.getRepository(ProductEntity)
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.parent', 'parent')
            
        if (isCatalog !== undefined) {
            query.where({ isCatalog })
        }
        
        return await query.getMany();
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
            .leftJoinAndSelect('cart.product', 'product')
            .where('product.id = :productId', { productId })
            .delete()
            .execute();

        await dataSource.getRepository(ProductEntity).delete({ id: productId });
    }
}

export default new ProductService();