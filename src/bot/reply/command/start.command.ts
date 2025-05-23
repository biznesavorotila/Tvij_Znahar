import { Context, InlineKeyboard } from "grammy";
import { EInlineKeyboard, MyContext } from "../../../types";
import text from '../../../text.json';
import { UserService } from "../../services/user";

export const startCommand = async (ctx: MyContext) => {
    const user = ctx.from;
    if (!user || !ctx.chat) {
        return await ctx.answerCallbackQuery('Помилка при отриманні користувача / даних з чату!');
    }
    // save user in database
    UserService.save({ 
        chat_id: ctx.chat.id, 
        username: user.username, 
        first_name: user.first_name,
    });

    const inlineKeyboard = new InlineKeyboard()
        .text(text.command.button.catalog, EInlineKeyboard.CATALOG).row()
        .text(text.command.button.cart, EInlineKeyboard.CART).row()
        .text(text.command.button.comments, EInlineKeyboard.COMMENTS).row()
        .text(text.command.button.contacts, EInlineKeyboard.CONTACTS).row()
        .text(text.command.button.aboutUs, EInlineKeyboard.ABOUT_US);

    const relpyText = text.command.text.start;
    const imageUrl = 'https://bluecorncandles.com/cdn/shop/files/fly-agaric-mushroom-or-plantable-wildflower-card-bluecorn-candles-1.jpg?v=1690332289';

    ctx.replyWithPhoto(imageUrl, {
        caption: relpyText,
        reply_markup: inlineKeyboard,
    });
}