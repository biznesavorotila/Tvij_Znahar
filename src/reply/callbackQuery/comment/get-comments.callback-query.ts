import { CommentService } from "../../../database/comment";
import { ECommentState } from "../../../enum/comment-state.enum";
import { MyContext } from "../../../types";

export const getComments = async (ctx: MyContext) => {
    const comments = await CommentService.getAllComments(ECommentState.ACCEPTED);
    let replyText = 'Усі відгуки: \n\n';

    if (comments.length === 0) {
        replyText = 'Немає відгуків!';
    } else {
        replyText = 'Усі відгуки: \n';
        replyText += comments
            .map((elem, index) => `\n<i>${elem.user} (${elem.created_at.toDateString()})</i>\n${elem.comment}`)
            .join('\n');
    }


    return await ctx.reply(replyText, { parse_mode: 'HTML' });
}