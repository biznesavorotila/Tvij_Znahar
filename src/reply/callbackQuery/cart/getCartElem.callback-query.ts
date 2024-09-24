import { InlineKeyboard } from "grammy";
import { CartService } from "../../../database/cart";
import { EInlineKeyboard, MyContext } from "../../../types";

export const getCartElem = async (ctx: MyContext, cartId: number) => {
    const user = ctx.from;
    if (!user) {
        return await ctx.answerCallbackQuery('Ошибка при получении пользователя!');
    }

    const cartElem = await CartService.getCartElem(cartId);
    if (!cartElem) {
        return await ctx.answerCallbackQuery('Товар в корзинке не найден!');
    }

    const inlineKeyboard = new InlineKeyboard()
        .text('+ 1 шт.', `${EInlineKeyboard.ADD_TO_CART}_${cartElem.product.id}`)
        .text('- 1 шт.', `${EInlineKeyboard.REMOVE_ONE_FROM_CART}_${cartElem.product.id}`)
        .text('Удалить с корзины', `${EInlineKeyboard.DELETE_FROM_CART}_${cartId}`)
        .text('Назад', EInlineKeyboard.CART);
}