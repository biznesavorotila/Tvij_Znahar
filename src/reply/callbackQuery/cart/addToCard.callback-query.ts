import { InlineKeyboard } from "grammy";
import { EInlineKeyboard, MyContext } from "../../../types";
import { CartService } from "../../../database/cart";

export const addToCart = async (ctx: MyContext, productId: number) => {
    const userId = ctx.from?.id.toString();
    if (!userId)
        return await ctx.answerCallbackQuery(
            'Ошибка при добавлении товара в корзину, не найден айди пользователя!'
        );

    const cart = await CartService.getSpecCart(userId, productId);
    if (cart) {
        // if already in cart
        CartService.updateQuantity(cart, cart.quantity + 1)
        .then(async () => {
            return await ctx.reply(
                `Товар уже в корзине! Обновленное количество товара <b><i>${cart.product.name}</i></b> - ${cart.quantity + 1} шт.`,
                {
                    reply_markup: new InlineKeyboard().text('Корзинка', EInlineKeyboard.CART), 
                    parse_mode: 'HTML' 
                }
            );
        })
        .catch(async () => {
            return await ctx.answerCallbackQuery('Произошла ошибка при обновлении количества товара в корзинке!');
        });
    } else {
        // if new
        CartService.addToCart({ userId, product: productId, quantity: 1 })
        .then(async () => {
            return await ctx.reply(
                'Товар добавлен в корзину!',
                {
                    reply_markup: new InlineKeyboard().text('Корзинка', EInlineKeyboard.CART),
                }
            );
        })
        .catch(async () => {
            return await ctx.answerCallbackQuery('Произошла ошибка при добавлении в корзину!');
        });
    }
}