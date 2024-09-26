import { InlineKeyboard } from "grammy";
import { EInlineKeyboard, MyContext } from "../../../types";
import { CartService } from "../../../database/cart";

export const addToCart = async (ctx: MyContext, productId: number) => {
    const userId = ctx.from?.id.toString();
    if (!userId)
        return await ctx.answerCallbackQuery(
            'Помилка при додаванні товару в кошик, не знайдено будь-якого користувача!'
        );

    const cart = await CartService.getSpecCart(userId, productId);
    if (cart) {
        // if already in cart
        CartService.updateQuantity(cart, cart.quantity + 1)
        .then(async () => {
            return await ctx.reply(
                `Товар уже в кошику! Оновлена ​​кількість товару <b><i>${cart.product.name}</i></b> - ${cart.quantity + 1} шт.`,
                {
                    reply_markup: new InlineKeyboard().text('Кошик', EInlineKeyboard.CART), 
                    parse_mode: 'HTML' 
                }
            );
        })
        .catch(async () => {
            return await ctx.answerCallbackQuery('Виникла помилка при оновленні кількості товару в кошику!');
        });
    } else {
        // if new
        CartService.addToCart({ userId, product: productId, quantity: 1 })
        .then(async () => {
            return await ctx.reply(
                'Товар доданий до кошика!',
                {
                    reply_markup: new InlineKeyboard().text('Кошик', EInlineKeyboard.CART),
                }
            );
        })
        .catch(async () => {
            return await ctx.answerCallbackQuery('Виникла помилка при додаванні в кошик!');
        });
    }
}