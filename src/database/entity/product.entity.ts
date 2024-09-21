import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn({ type: 'int4' })
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'int4' })
    price: number;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar' })
    image: string;
}