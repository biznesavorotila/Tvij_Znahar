import { Context, InlineKeyboard } from "grammy";
import { dataSource } from "../../database/data-source";
import { ProductEntity } from "../../database/entity/product.entity";
import { EInlineKeyboard } from "../../types";

export const catalog = async (ctx: Context) => {
    const products = await dataSource.getRepository(ProductEntity)
        .find();

    const imageUrl = 'https://shop.kew.org/media/catalog/product/cache/885b485af1f21add4118cd522bc22c77/m/u/mushroom_col_atlas_concertina.jpg';
    const relpyText = 'Каталог всех товаров. Приятных покупок!';

    const inlineKeyboard = new InlineKeyboard();
    products.forEach(product => {
        inlineKeyboard.text(
            `${product.name} - ${product.price} грн.`, 
            `${EInlineKeyboard.PRODUCT}_${product.id.toString()}`
        ).row();
    });
    
    await ctx.replyWithPhoto(imageUrl, {
        caption: relpyText,
        reply_markup: inlineKeyboard
    });
}