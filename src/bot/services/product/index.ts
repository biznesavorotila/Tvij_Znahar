import { dataSource } from "../../../database/data-source";
import { ProductEntity } from "../../../database/entity/product.entity";
import { TGetProduct } from "./types";

export class ProductService {
    public static async getProducts({ isParentNull, parentId }: TGetProduct) {
        const queryBuilder = dataSource.getRepository(ProductEntity).createQueryBuilder('product');

        if (isParentNull !== undefined) {
            queryBuilder
                .andWhere(`product.product_id IS ${isParentNull ? 'NULL' : 'NOT NULL'}`)
        }        
        if (parentId !== undefined) {
            queryBuilder
                .andWhere('product.product_id = :parentId', { parentId })
        }

        queryBuilder.orderBy('product.id', 'ASC');

        return await queryBuilder.getMany();
    }

    public static async getProduct(id: number) {
        return await dataSource
            .getRepository(ProductEntity)
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.parent', 'parent')
            .where('product.id = :id', { id })
            .orderBy('product.id', 'DESC')
            .getOne();
    }
}