import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, } from "typeorm";
import { ECommentState } from "../../enum/comment-state.enum";

@Entity({ name: 'comment' })
export class CommentEntity {
    @PrimaryGeneratedColumn({ type: 'int4' })
    id: number;

    @CreateDateColumn()
    public created_at: Date;

    @Column({ type: 'varchar' })
    comment: string;

    @Column({ type: 'varchar' })
    user: string;

    @Column({ type: 'enum', default: ECommentState.PENDING, enum: ECommentState })
    state: ECommentState;
}