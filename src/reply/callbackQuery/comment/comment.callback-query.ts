import { EInlineKeyboard, MyContext } from "../../../types";
import text from '../../../text.json';
import { InlineKeyboard } from "grammy";

export const comments = async (ctx: MyContext) => {
    const inlineKeyboard = new InlineKeyboard()
        .text(text.command.comment.create, EInlineKeyboard.CREATE_COMMENT).row()
        .text(text.command.comment.view, EInlineKeyboard.VIEW_COMMENTS)

    return await ctx.reply(text.command.comment.info, {
        reply_markup: inlineKeyboard
    });
}