import { Context, InlineKeyboard } from "grammy";
import { dataSource } from "../../database/data-source";
import { ProductEntity } from "../../database/entity/product.entity";
import { EInlineKeyboard } from "../../types";

export const product = async (ctx: Context, id: number) => {
    const product = await dataSource.getRepository(ProductEntity).findOneBy({ id: id });
    if (!product) 
        return await ctx.answerCallbackQuery('Продукт не найден!');

    const replyText = `<i><b>${product.name}</b></i>\n` +
    `${product.description}\n\n` +
    `💸<b>${product.price}</b> грн.💸`

    console.log('Product: ', product);

    const inlineKeyboard = new InlineKeyboard()
        .text('Добавить в корзинку', `${EInlineKeyboard.ADD_TO_CART}_${id}`).row()
        .text('Назад', EInlineKeyboard.CATALOG)

        
    await ctx.replyWithPhoto(product.image);
    await ctx.reply(replyText, {
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard
    })
}