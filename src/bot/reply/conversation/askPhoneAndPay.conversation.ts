import { bot } from "../../bot";
import { CartService } from "../../services/cart";
import { MyContext, MyConversation } from "../../../types";
import { UserService } from "../../services/user";

const ADMIN_ID = Number(process.env.ADMIN_ID);
export const askPhoneAndPay = async (conversation: MyConversation, ctx: MyContext) => {
    const user = ctx.from;
    if (!user)
        return ctx.answerCallbackQuery(
            'Помилка при оплаті, не знайдено!'
        );

    await ctx.reply("Ваш кошик буде передано нашим адмінам.\nВони зв'яжуться з вами для підтвердження оплати.\nВведіть ваш контактний номер телефону:");
    const phone = await conversation.form.text();

    // save phone number
    UserService.updatePhone({
        chat_id: user.id,
        phone,
    })
    
    const cart = await CartService.getUserCart(user.id.toString());
    const replyText = `Користувач\n Ім'я: ${user.first_name || ''}\n Прізвище: ${user.last_name || ''}\n Посилання: @${user.username}\n Телефон: ${phone} \n\nхоче купити:\n` +
    `${cart.map((elem, index) => `${index + 1}. ${elem.product.name} x ${elem.quantity} шт.`).join('\n')} \n`+
    `\nУ сумі: ${cart.reduce((acc, elem) => acc + elem.quantity * elem.product.price!, 0)} грн.`

    await ctx.reply('Дані передані адмінам! Чекайте на дзвінок або повідомлення в телеграмі.');
    await bot.api.sendMessage(ADMIN_ID, replyText);

    return;
}