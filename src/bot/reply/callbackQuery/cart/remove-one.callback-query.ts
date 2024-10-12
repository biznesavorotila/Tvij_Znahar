import { InlineKeyboard } from "grammy";
import { CartService } from "../../../services/cart";
import { EInlineKeyboard, MyContext } from "../../../../types";

export const removeOne = async (ctx: MyContext, productId: number) => {
    const user = ctx.from;
    if (!user) {
        return await ctx.answerCallbackQuery('Помилка при отриманні користувача!');
    }

    const cartElem = await CartService.getSpecCart(user.id.toString(), productId);
    if (!cartElem) {
        return await ctx.answerCallbackQuery('Товар у кошику не знайдено!');
    }

    // if min quantity
    if (cartElem.quantity === 1) {
        const replyText = `Мінімальна кількість товару <i><b>${cartElem.product.name}</b></i> - 1 шт.,` + 
            ` ви не можете зменшити кількість.\n\n` + 
            `<b>Якщо хочете видалити товар, натисніть <u><i>"Видалити з кошика"</i></u></b>`;
        
        return await ctx.reply(replyText, {
            reply_markup: new InlineKeyboard()
                .text('Назад', EInlineKeyboard.CART),
            parse_mode: 'HTML',
        })
    }

    await CartService.updateQuantity(cartElem, cartElem.quantity - 1)
    .then(async (res) => {
        const replyText = `1 шт. товару прибрано з кошика! Обновлена ​​кількість` +
            `товара <i><b>${cartElem.product.name}</b></i>: ${res.quantity} шт.`;
        const inlineKeyboard = new InlineKeyboard()
            .text('Кошик', EInlineKeyboard.CART).row();

        return await ctx.reply(replyText, {
            reply_markup: inlineKeyboard,
            parse_mode: 'HTML',
        });
    })
    .catch(async (err) => {
        console.log('RemoveOne: ', err);
        return await ctx.answerCallbackQuery('Помилка при спробі змінити кількість товару!');
    });
}