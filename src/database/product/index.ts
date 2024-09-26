import { dataSource } from "../data-source";
import { ProductEntity } from "../entity/product.entity";
import { TGetProduct } from "./types";

export class ProductService {
    public static async getProducts({ isParentNull, parentId }: TGetProduct) {
        const queryBuilder = dataSource.getRepository(ProductEntity).createQueryBuilder('product');

        if (isParentNull !== undefined) {
            queryBuilder
                .andWhere(`product.parent IS ${isParentNull ? 'NULL' : 'NOT NULL'}`)
        }        
        if (parentId !== undefined) {
            queryBuilder
                .andWhere('product.product_id = :parentId', { parentId })
        }

        return await queryBuilder.getMany();
    }

    public static async getProduct(id: number) {
        return await dataSource
            .getRepository(ProductEntity)
            .createQueryBuilder('product')
            .where('product.id = :id', { id })
            .getOne();
    }
}