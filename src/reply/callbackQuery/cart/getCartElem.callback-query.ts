import { InlineKeyboard } from "grammy";
import { CartService } from "../../../database/cart";
import { EInlineKeyboard, MyContext } from "../../../types";

export const getCartElem = async (ctx: MyContext, cartId: number) => {
    const user = ctx.from;
    if (!user) {
        return await ctx.answerCallbackQuery('Помилка при отриманні користувача!');
    }

    const cartElem = await CartService.getCartElem(cartId);
    if (!cartElem) {
        return await ctx.answerCallbackQuery('Товар у кошику не знайдено!');
    }

    const inlineKeyboard = new InlineKeyboard()
        .text('+ 1 шт.', `${EInlineKeyboard.ADD_TO_CART}_${cartElem.product.id}`)
        .text('- 1 шт.', `${EInlineKeyboard.REMOVE_ONE_FROM_CART}_${cartElem.product.id}`).row()
        .text('Видалити з кошика', `${EInlineKeyboard.DELETE_FROM_CART}_${cartElem.id}`).row()
        .text('Назад', EInlineKeyboard.CART);
    const replyText = `<i><b>${cartElem.product.name}</b></i>\n` +
    `${cartElem.product.description.slice(0, 300)}...\n\n` +
    `💸<b>${cartElem.product.price}</b> грн.💸\n`;

    await ctx.replyWithPhoto(cartElem.product.image, {
        caption: replyText,
        reply_markup: inlineKeyboard,
        parse_mode: 'HTML',
    });
}