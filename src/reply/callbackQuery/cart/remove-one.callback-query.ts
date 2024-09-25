import { InlineKeyboard } from "grammy";
import { CartService } from "../../../database/cart";
import { EInlineKeyboard, MyContext } from "../../../types";

export const removeOne = async (ctx: MyContext, productId: number) => {
    const user = ctx.from;
    if (!user) {
        return await ctx.answerCallbackQuery('Ошибка при получении пользователя!');
    }

    const cartElem = await CartService.getSpecCart(user.id.toString(), productId);
    if (!cartElem) {
        return await ctx.answerCallbackQuery('Товар в корзинке не найден!');
    }

    // if min quantity
    if (cartElem.quantity === 1) {
        const replyText = `Минимальное количество товара <i><b>${cartElem.product.name}</b></i> - 1 шт.,` + 
            ` вы не модете уменьшить количество.\n\n` + 
            `<b>Если хотите удалить товар, нажмите <u><i>"Удалить с корзины"</i></u></b>`;
        
        return await ctx.reply(replyText, {
            reply_markup: new InlineKeyboard()
                .text('Назад', EInlineKeyboard.CART),
            parse_mode: 'HTML',
        })
    }

    await CartService.updateQuantity(cartElem, cartElem.quantity - 1)
    .then(async (res) => {
        const replyText = `1 шт. товара убрана из корзины! Обнловленное количество` +
            `товара <i><b>${cartElem.product.name}</b></i>: ${res.quantity} шт.`;
        const inlineKeyboard = new InlineKeyboard()
            .text('Корзинка', EInlineKeyboard.CART).row();

        return await ctx.reply(replyText, {
            reply_markup: inlineKeyboard,
            parse_mode: 'HTML',
        });
    })
    .catch(async (err) => {
        console.log('RemoveOne: ', err);
        return await ctx.answerCallbackQuery('Ошибка при попытке поменять количество товара!');
    });
}