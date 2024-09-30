import { InlineKeyboard } from "grammy";
import { ProductService } from "../../database/product";
import { EInlineKeyboard, MyContext } from "../../types";

export const productCatalog = async (ctx: MyContext, parentId: number) => {
    const parentProduct = await ProductService.getProduct(parentId);
    if (!parentProduct) {
        return await ctx.answerCallbackQuery('Продукт не знайдено!');
    }
    const products = (await ProductService.getProducts({ parentId })).sort((a, b) => a.price! - b.price!);

    const inlineKeyboard = new InlineKeyboard();
    products.forEach(product => {
        inlineKeyboard.text(
            `${product.name} - ${product.price} грн.`, 
            `${EInlineKeyboard.PRODUCT}_${product.id}`
        ).row();
    });
    inlineKeyboard.text('Назад ⬅️', EInlineKeyboard.CATALOG);
    const replyText = `📦 Каталог <b>${parentProduct.name}</b> 📦\n\n` +
    `${parentProduct.description}\n\n` +
    `<b>Усього продуктів: ${products.length}</b>`;

    await ctx.replyWithPhoto(parentProduct.image);
    return await ctx.reply(replyText, {
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard,
    })
}