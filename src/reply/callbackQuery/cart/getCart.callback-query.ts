import { InlineKeyboard } from "grammy";
import { EInlineKeyboard, MyContext } from "../../../types";
import { CartService } from "../../../database/cart";

export const getUserCart = async (ctx: MyContext) => {
    const userId = ctx.from?.id.toString();
    if (!userId)
        return await ctx.answerCallbackQuery(
            'Ошибка при получении корзины, не найден айди пользователя!'
        );
    
    const cart = await CartService.getUserCart(userId);
    const totalSum = cart.reduce((acc, elem) => acc + elem.quantity * elem.product.price, 0);

    const replyText = `Ваша корзинка. Нажмите на товар, что бы редактировать его!\n` +
    `\n<b>В сумме: ${totalSum} грн.</b>`;

    const inlineKeyboard = new InlineKeyboard();
    cart.forEach((elem, index) => {
        inlineKeyboard.text(
            `${elem.product.name} - ${elem.product.price} грн. x ${elem.quantity} шт. - ${elem.product.price * elem.quantity} грн.`, 
            `${EInlineKeyboard.CART_ELEM_INFO}_${elem.id}`
        ).row();
    });
    inlineKeyboard.text(`Перейти к оплате корзинки - ${totalSum} грн.`, EInlineKeyboard.PAYMENT);

    await ctx.reply(replyText, { 
        reply_markup: inlineKeyboard,
        parse_mode: 'HTML'
    });
}