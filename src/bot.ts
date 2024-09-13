import { Bot, session } from "grammy";
import { EInlineKeyboard, MyContext, MyConversation, SessionData } from "./types";
import { startCommand } from "./reply/command";
import { aboutUs } from "./reply/callbackQuery";
import { catalog } from "./reply/callbackQuery/catalog.callback-query";
import { product } from "./reply/callbackQuery/product.callback-query";
import { addToCart } from "./reply/callbackQuery/addToCard.callback-query";
import { getUserCart } from "./reply/callbackQuery/getCart.callback-query";
import { payment } from "./reply/callbackQuery/payment.callback-query";
import { conversations, createConversation } from "@grammyjs/conversations";
import { askPhoneAndPay } from "./reply/conversation";

const BOT_TOKEN = process.env.BOT_TOKEN as string;
export const bot = new Bot<MyContext>(BOT_TOKEN);

// Apply session and conversation middleware
bot.use(session({ conversation: {}, type: 'multi' })); 
bot.use(conversations());
bot.use(createConversation(askPhoneAndPay));

bot.command('start', startCommand);

bot.callbackQuery(EInlineKeyboard.ABOUT_US, aboutUs);
bot.callbackQuery(EInlineKeyboard.CATALOG, catalog);
bot.callbackQuery(EInlineKeyboard.CART, getUserCart);
bot.callbackQuery(EInlineKeyboard.PAYMENT, payment);
bot.on('callback_query:data', async ctx => {
    const query = ctx.callbackQuery.data;
    
    // view product
    if (query.includes(EInlineKeyboard.PRODUCT.toString())) {
        const id = query.split('_')[1];
        if (!id) 
            await ctx.answerCallbackQuery('Продукт не найден!');

        await product(ctx, Number(id));
    }

    // add to card 
    if (query.includes(EInlineKeyboard.ADD_TO_CART.toString())) {
        console.log('Add to cart function! => ', query);
        const id = query.split('_')[1];
        if (!id) 
            await ctx.answerCallbackQuery('Продукт не найден!');

        console.log('Add to cart function!');
        await addToCart(ctx, Number(id));
    }
});
