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

    let backButton: string = EInlineKeyboard.CATALOG;
    if (product.parent) {
        backButton = `${EInlineKeyboard.PRODUCT}_${product.parent.id.toString()}_${product.isCatalog.toString()}`;
    }

    const inlineKeyboard = new InlineKeyboard()
        .text('Додати до кошика', `${EInlineKeyboard.ADD_TO_CART}_${id}`).row()
        .text('Назад', backButton)
        
    try {
        await ctx.replyWithPhoto(product.image);
    } catch (error) {
        console.log(error);
    }
    await ctx.reply(replyText, {
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard
    })
}