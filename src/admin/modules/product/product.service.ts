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
}

export default new ProductService();