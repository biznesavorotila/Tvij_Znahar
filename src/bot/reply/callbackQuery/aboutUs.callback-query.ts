import { Context } from "grammy";

export const aboutUs = async (ctx: Context) => {
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWRCJvyTn8iWaDtM6SBOkvU-6hpxH4qXPkNA&s';
    const relpyText = `Магазин "Твій Знахар" надає можливість покупки 🍄` +
        `з доставкою по всій Україні! У нас найбільший асортимент 🍄, найкращий товар та найшвидша доставка`;    

    await ctx.replyWithPhoto(imageUrl, {
        caption: relpyText
    });
}