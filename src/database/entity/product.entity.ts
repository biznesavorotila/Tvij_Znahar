import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn({ type: 'int4' })
    id: number;

    @ManyToOne(() => ProductEntity, (product) => product.id, { nullable: true })
    @JoinColumn({ name: 'product_id' })
    parent: ProductEntity | null;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'int4', nullable: true })
    price: number | null;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar' })
    image: string;

    @Column({ type: 'bool', default: false })
    isCatalog: boolean;

    @Column({ type: 'bool', default: true })
    isPublished: boolean;
}