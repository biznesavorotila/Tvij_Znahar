import { InlineKeyboard } from "grammy";
import { CartService } from "../../../services/cart";
import { EInlineKeyboard, MyContext } from "../../../../types";

export const deleteCartElem = async (ctx: MyContext, cartId: number) => {
    const user = ctx.from;
    if (!user) {
        return await ctx.answerCallbackQuery('Помилка при отриманні користувача!');
    }

    await CartService.deleteCartById(cartId)
        .then(async () => {
            const replyText = `Продукт видалено з вашого кошика!`;
            const inlineKeyboard = new InlineKeyboard()
                .text('Назад', EInlineKeyboard.CART).row();

            return await ctx.reply(replyText, {
                reply_markup: inlineKeyboard,
                parse_mode: 'HTML',
            });
        })
        .catch(async (err) => {
            console.log('RemoveOne: ', err);
            return await ctx.answerCallbackQuery('Помилка при спробі видалити товар із кошика!');
        });
}