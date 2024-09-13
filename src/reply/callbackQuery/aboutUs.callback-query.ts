import { Context } from "grammy";

export const aboutUs = async (ctx: Context) => {
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWRCJvyTn8iWaDtM6SBOkvU-6hpxH4qXPkNA&s';
    const relpyText = `Магазин "Mushrrom Store" предостовляет возможность покупки 🍄` +
        `с доставкой по всей Украине! У нас самый большой ассортимент 🍄, самый лучший товар и самая быстрая доставка`;    

    await ctx.replyWithPhoto(imageUrl, {
        caption: relpyText
    });
}