import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    chat_id: number;

    @Column({ type: 'varchar', nullable: true })
    username: string;

    @Column({ type: 'varchar', nullable: true })
    phone: string;

    @Column({ type: 'varchar' })
    first_name: string;
}