import { Context, InlineKeyboard } from "grammy";
import { EInlineKeyboard } from "../../../types";
import { ProductService } from "../../services/product";

export const catalog = async (ctx: Context) => {
    const products = (await ProductService.getProducts({ isParentNull: true }));

    const imageUrl = 'https://shop.kew.org/media/catalog/product/cache/885b485af1f21add4118cd522bc22c77/m/u/mushroom_col_atlas_concertina.jpg';
    const relpyText = 'Каталог усіх товарів. Приємних покупок!';

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