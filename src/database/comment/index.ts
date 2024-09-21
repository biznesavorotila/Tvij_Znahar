import { ECommentState } from "../../enum/comment-state.enum";
import { dataSource } from "../data-source";
import { CommentEntity } from "../entity/comment.entity";

export class CommentService {
    /**
     * Creates a new comment. Default state is PENDING
     *
     * @param {{ comment: string, user: string }} comment - An object containing the comment text and the user who made the comment.
     * @return {Promise<void>} A promise that resolves when the comment has been created.
     */
    public static async createComment(comment: { comment: string, user: string }) {
        return await dataSource
            .getRepository(CommentEntity)
            .createQueryBuilder()
            .insert()
            .into(CommentEntity)
            .values({ comment: comment.comment, user: comment.user, state: ECommentState.PENDING })
            .returning('*')
            .execute();
    }

    public static async getAllComments(type: ECommentState.ACCEPTED | ECommentState.PENDING) {
        return await dataSource
            .getRepository(CommentEntity)
            .createQueryBuilder('comment')
            .where('comment.state = :state', { state: type })
            .getMany();
    }

    public static async acceptComment(commentId: number) {
        return await dataSource
            .getRepository(CommentEntity)
            .createQueryBuilder()
            .update(CommentEntity)
            .set({ state: ECommentState.ACCEPTED })
            .where('id = :id', { id: commentId })
            .execute();
    }

    public static async rejectComment(commentId: number) {
        return await dataSource
            .getRepository(CommentEntity)
            .createQueryBuilder()
            .update(CommentEntity)
            .set({ state: ECommentState.REJECTED })
            .where('id = :id', { id: commentId })
            .execute();
    }
}