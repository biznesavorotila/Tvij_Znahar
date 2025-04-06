import { dataSource } from "../../../database/data-source";
import { CartEntity } from "../../../database/entity/cart.entity";
import { ProductEntity } from "../../../database/entity/product.entity";
import staticService from "../static/static.service";
import { TProductCreate } from "./types";

class ProductService {
    async create(newProduct: TProductCreate) {
        if (!newProduct.product_id) {
            return await dataSource.getRepository(ProductEntity).save(newProduct);
        } else {
            return await dataSource.getRepository(ProductEntity).save({
                ...newProduct,
                parent: { id: newProduct.product_id }
            });
        }
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

        
        // 1. Fetch the products that will be deleted
        const productsToDelete = await dataSource.getRepository(ProductEntity)
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.parent', 'parent')
            .where('product.id = :productId OR parent.id = :productId', { productId })
            .getMany();

        if (!productsToDelete.length) {
            console.log('Product not found');
            return;
        }

        // 2. Delete them in a transaction
        await dataSource.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.remove(productsToDelete);
        });

        for (const product of productsToDelete) {
            await staticService.remove(product.image);
        }
    }
}

export default new ProductService();