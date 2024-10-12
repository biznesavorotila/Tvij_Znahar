import { InlineKeyboard } from "grammy";
import { CommentService } from "../../services/comment";
import { EInlineKeyboard, MyContext, MyConversation } from "../../../types";
import { bot } from "../../bot";

const ADMIN_ID = Number(process.env.ADMIN_ID);
export const askComment = async (conversation: MyConversation, ctx: MyContext) => {
    try {
        const user = ctx.from;
        if (!user) {
            return await ctx.answerCallbackQuery('Помилка при отриманні користувача!');
        }
        
        await ctx.reply('Напишіть, будь ласка, ваш відгук: ');
        const newComment = await conversation.form.text();
        
        CommentService.createComment({ comment: newComment, user: user.first_name })
        .then(async (res) => {
            await ctx.answerCallbackQuery('Ваш відгук успішно доданий!');
            
            // send to moderation
            const newCommentId = res.identifiers[0].id;
            const replyText = `⚠️<b>НОВИЙ ВІДГУК</b>⚠️\n<i>${user.first_name} (${new Date().toDateString()})</i>\n${newComment}`;
            const inlineKeyboard = new InlineKeyboard()
            .text('Підтвердити ✅', `${EInlineKeyboard.ACCEPT_COMMENT}_${newCommentId}`).row()
            .text('Відхилити ❌', `${EInlineKeyboard.REJECT_COMMENT}_${newCommentId}`);
            await bot.api.sendMessage(ADMIN_ID, replyText, {
                reply_markup: inlineKeyboard,
                parse_mode: 'HTML'
            });
        })
        .catch(async err => {
            console.log(err);
            await ctx.answerCallbackQuery('Виникла помилка при додаванні відгуку!');
            return;
        }).finally(async () => {
            return;
        });
    } catch (e) {
        console.log(e);
        return await ctx.answerCallbackQuery('Виникла помилка при додаванні відгуку!'); 
    }
}