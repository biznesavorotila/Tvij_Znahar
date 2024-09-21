import { InlineKeyboard } from "grammy";
import { EInlineKeyboard, MyContext } from "../../types";
import { CartService } from "../../database/cart";
import { ProductEntity } from "../../database/entity/product.entity";
import { dataSource } from "../../database/data-source";

export const getUserCart = async (ctx: MyContext) => {
    const userId = ctx.from?.id.toString();
    if (!userId)
        return await ctx.answerCallbackQuery(
            'Ошибка при получении корзины, не найден айди пользователя!'
        );
    
    const cart = await CartService.getUserCart(userId);

    const replyText = `Ваша корзинка:\n\n` +
    `${cart.map((elem, index) => `${index + 1}. ${elem.product.name} x ${elem.quantity} шт. - ${elem.quantity * elem.product.price} грн.`).join('\n')}\n` +
    `\nВ сумме: ${cart.reduce((acc, elem) => acc + elem.quantity * elem.product.price, 0)} грн.`;

    const inlineKeyboard = new InlineKeyboard()
        .text('Перейти к оплате корзинки', EInlineKeyboard.PAYMENT).row();

    await ctx.reply(replyText, { reply_markup: inlineKeyboard });
}