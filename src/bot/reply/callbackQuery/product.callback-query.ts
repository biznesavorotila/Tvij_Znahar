import { Context, InlineKeyboard } from "grammy";
import { EInlineKeyboard } from "../../../types";
import { ProductService } from "../../services/product";

export const product = async (ctx: Context, id: number) => {
    const product = await ProductService.getProduct(id);
    if (!product) 
        return await ctx.answerCallbackQuery('Продукт не знайдено!');

    const replyText = `<i><b>${product.name}</b></i>\n` +
    `${product.description}\n\n` +
    `💸<b>${product.price}</b> грн.💸`

    const inlineKeyboard = new InlineKeyboard()
        .text('Додати до кошика', `${EInlineKeyboard.ADD_TO_CART}_${id}`).row()
        .text('Назад', EInlineKeyboard.CATALOG)

        
    await ctx.replyWithPhoto(product.image);
    await ctx.reply(replyText, {
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard
    })
}