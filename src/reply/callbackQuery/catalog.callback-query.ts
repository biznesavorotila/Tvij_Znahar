import { Context, InlineKeyboard } from "grammy";
import { EInlineKeyboard } from "../../types";
import { ProductService } from "../../database/product";

export const catalog = async (ctx: Context) => {
    const products = (await ProductService.getProducts({ isParentNull: true })).sort((a, b) => a.price! - b.price!);

    const imageUrl = 'https://shop.kew.org/media/catalog/product/cache/885b485af1f21add4118cd522bc22c77/m/u/mushroom_col_atlas_concertina.jpg';
    const relpyText = 'Каталог всех товаров. Приятных покупок!';

    const inlineKeyboard = new InlineKeyboard();
    products.forEach(product => {
        inlineKeyboard.text(
            `${product.name} ${ product.price ? `- ${product.price} грн.` : '' }`, 
            `${EInlineKeyboard.PRODUCT}_${product.id.toString()}_${product.isCatalog.toString()}`
        ).row();
    });
    
    await ctx.replyWithPhoto(imageUrl, {
        caption: relpyText,
        reply_markup: inlineKeyboard
    });
}