import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({ name: 'cart' })
export class CartEntity {
    @PrimaryGeneratedColumn({ type: 'int4' })
    id: string;

    @Column({ type: 'varchar' })
    userId: string;

    @ManyToOne(() => ProductEntity, (product) => product.id)
    product: ProductEntity;

    @Column({ type: 'int' })
    quantity: number;
}