import { dataSource } from "../../../database/data-source";
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
        // console.log(productId)
        // const product = await this.getProduct(productId);

        // return await dataSource.getRepository(ProductEntity)
        //     .createQueryBuilder()
        //     .update(ProductEntity)
        //     .set(update)
        //     .where({ id: productId })
        //     .execute();
    }
}

export default new ProductService();