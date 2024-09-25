import { InlineKeyboard } from "grammy";
import { CartService } from "../../../database/cart";
import { EInlineKeyboard, MyContext } from "../../../types";

export const deleteCartElem = async (ctx: MyContext, cartId: number) => {
    const user = ctx.from;
    if (!user) {
        return await ctx.answerCallbackQuery('Ошибка при получении пользователя!');
    }

    await CartService.deleteCartById(cartId)
        .then(async () => {
            const replyText = `Продукт удален с вашей корзинки!`;
            const inlineKeyboard = new InlineKeyboard()
                .text('Назад', EInlineKeyboard.CART).row();

            return await ctx.reply(replyText, {
                reply_markup: inlineKeyboard,
                parse_mode: 'HTML',
            });
        })
        .catch(async (err) => {
            console.log('RemoveOne: ', err);
            return await ctx.answerCallbackQuery('Ошибка при попытке удалить товар с корзинки!');
        });
}