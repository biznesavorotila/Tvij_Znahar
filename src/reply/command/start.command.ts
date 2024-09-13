import { Context, InlineKeyboard } from "grammy";
import { EInlineKeyboard, MyContext } from "../../types";

export const startCommand = async (ctx: MyContext) => {
    const user = ctx.from;

    const inlineKeyboard = new InlineKeyboard()
        .text('Каталог 📖', EInlineKeyboard.CATALOG).row()
        .text('Корзинка 🛒', EInlineKeyboard.CART).row()
        .text('О Нас ℹ️', EInlineKeyboard.ABOUT_US);

    const relpyText = `Привет, ${user?.first_name}! "Шляпка" — это магазин для тех, кто хочет открыть для себя мир микродозинга! 🍄 У нас вы найдете грибы, которые помогут улучшить настроение, повысить концентрацию и раскрыть творческий потенциал 🌿. Мы заботимся о качестве и безопасности каждого продукта. Начните свой путь к новому состоянию с "Шляпкой"! 🌱`;
    const imageUrl = 'https://bluecorncandles.com/cdn/shop/files/fly-agaric-mushroom-or-plantable-wildflower-card-bluecorn-candles-1.jpg?v=1690332289';

    ctx.replyWithPhoto(imageUrl, {
        caption: relpyText,
        reply_markup: inlineKeyboard,
    });
}