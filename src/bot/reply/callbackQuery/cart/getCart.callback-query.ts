import { InlineKeyboard } from "grammy";
import { EInlineKeyboard, MyContext } from "../../../../types";
import { CartService } from "../../../services/cart";

export const getUserCart = async (ctx: MyContext) => {
    const userId = ctx.from?.id.toString();
    if (!userId)
        return await ctx.answerCallbackQuery(
            'Помилка при отриманні кошика, не знайдено будь-якого користувача!'
        );
    
    const cart = await CartService.getUserCart(userId);
    if (cart.length === 0) {
        const replyText = `<b>Кошик порожній!</b>\n\n Ви можете додати товар до кошика, натиснувши на кнопку ` +
        `<b>"Продукція"</b> -> Виберіть товар -> "<b>Додати до кошика</b>"`;

        return await ctx.reply(replyText, { 
            parse_mode: 'HTML'
        });
    } 

    const totalSum = cart.reduce((acc, elem) => acc + elem.quantity * elem.product.price!, 0);
    const replyText = `Ваш кошик. Натисніть на товар, щоб редагувати його!\n` +
    `\n<b>У сумі: ${totalSum} грн.</b>`;
    const inlineKeyboard = new InlineKeyboard();
    cart.forEach((elem, index) => {
        inlineKeyboard.text(
            `${elem.product.name} - ${elem.product.price} грн. x ${elem.quantity} шт. - ${elem.product.price! * elem.quantity} грн.`, 
            `${EInlineKeyboard.CART_ELEM_INFO}_${elem.id}`
        ).row();
    });
    inlineKeyboard
        .text(`Перейти до оплати кошика - ${totalSum} грн.`, EInlineKeyboard.PAYMENT).row()
        .text('Продукція 🍄', EInlineKeyboard.CATALOG);

    return await ctx.reply(replyText, { 
        reply_markup: inlineKeyboard,
        parse_mode: 'HTML'
    });
}