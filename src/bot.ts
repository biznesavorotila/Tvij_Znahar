import { Bot, session } from "grammy";
import { EInlineKeyboard, MyContext } from "./types";
import { startCommand } from "./reply/command";
import { conversations, createConversation } from "@grammyjs/conversations";
import { askComment, askPhoneAndPay } from "./reply/conversation";
import { CommentService } from "./database/comment";
import { aboutUs, catalog, comments, contacts, createComment, getComments, getUserCart, payment, product } from "./reply/callbackQuery";
import { addToCart, getCartElem } from "./reply/callbackQuery/cart";

const BOT_TOKEN = process.env.BOT_TOKEN as string;
export const bot = new Bot<MyContext>(BOT_TOKEN);

// Apply session and conversation middleware
bot.use(session({ conversation: {}, type: 'multi' })); 
bot.use(conversations());
bot.use(createConversation(askComment));
bot.use(createConversation(askPhoneAndPay));

bot.command('start', startCommand);
bot.command('cart', getUserCart);
bot.command('products', catalog);

bot.callbackQuery(EInlineKeyboard.ABOUT_US, aboutUs);
bot.callbackQuery(EInlineKeyboard.CATALOG, catalog);
bot.callbackQuery(EInlineKeyboard.CART, getUserCart);
bot.callbackQuery(EInlineKeyboard.PAYMENT, payment);
bot.callbackQuery(EInlineKeyboard.COMMENTS, comments);
bot.callbackQuery(EInlineKeyboard.VIEW_COMMENTS, getComments);
bot.callbackQuery(EInlineKeyboard.CREATE_COMMENT, createComment);
bot.callbackQuery(EInlineKeyboard.CONTACTS, contacts);
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
    // get cart elem info
    if (query.includes(EInlineKeyboard.CART_ELEM_INFO.toString())) {
        const id = query.split('_')[1];
        if (!id) 
            await ctx.answerCallbackQuery('Товар в корзинке не найден!');

        await getCartElem(ctx, Number(id));
    }
    // delete from cart
    if (query.includes(EInlineKeyboard.DELETE_FROM_CART.toString())) {
        const id = query.split('_')[1];
        if (!id) 
            await ctx.answerCallbackQuery('Товар в корзинке не найден!');
    }


    // accept comment
    if (query.includes(EInlineKeyboard.ACCEPT_COMMENT.toString())) {
        const id = query.split('_')[1];
        if (!id) 
            await ctx.answerCallbackQuery('Комментарий не найден!');

        CommentService.acceptComment(Number(id));
        await ctx.answerCallbackQuery('Комментарий принят!');
    }
    // accept comment
    if (query.includes(EInlineKeyboard.REJECT_COMMENT.toString())) {
        const id = query.split('_')[1];
        if (!id) 
            await ctx.answerCallbackQuery('Комментарий не найден!');

        CommentService.rejectComment(Number(id));
        await ctx.answerCallbackQuery('Комментарий отклонен!');
    }
});
