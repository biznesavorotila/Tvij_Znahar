import { CartService } from "../../../database/cart";
import { MyContext } from "../../../types";

export const removeOne = async (ctx: MyContext, cartId: number) => {
    const user = ctx.from;
    if (!user) {
        return await ctx.answerCallbackQuery('Ошибка при получении пользователя!');
    }

    const cartElem = await CartService.getCartElem(cartId);
    if (!cartElem) {
        return await ctx.answerCallbackQuery('Товар в корзинке не найден!');
    }

    CartService.updateQuantity(cartElem, cartElem.quantity - 1)
    .then(async (res) => {
        return await ctx.answerCallbackQuery(`Количество товаров изменено на "${res.quantity}"!`);
    })
    .catch(async (err) => {
        console.log('RemoveOne: ', err);
        return await ctx.answerCallbackQuery('Ошибка при попытке поменять количество товара!');
    });
}