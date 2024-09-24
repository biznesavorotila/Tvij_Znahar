import { MyContext } from "../../../types";

export const deleteCartElem = async (ctx: MyContext, cartId: number) => {
    const user = ctx.from;
    if (!user) {
        return await ctx.answerCallbackQuery('Ошибка при получении пользователя!');
    }

    
}