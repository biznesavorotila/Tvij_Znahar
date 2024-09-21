import { bot } from "../../bot";
import { CartService } from "../../database/cart";
import { MyContext, MyConversation } from "../../types";

const ADMIN_ID = Number(process.env.ADMIN_ID);
export const askPhoneAndPay = async (conversation: MyConversation, ctx: MyContext) => {
    const user = ctx.from;
    if (!user)
        return ctx.answerCallbackQuery(
            'Ошибка при оплате, не найден айди пользователя!'
        );

    await ctx.reply('Ваша корзинка будет передана нашим админам.\nОни свяжутся с вами для подтверждения оплаты.\nВведие ваш контактный номер телефона:');
    const phone = await conversation.form.text();
    
    const cart = await CartService.getUserCart(user.id.toString());
    const replayText = `Пользователь\n Имя: ${user.first_name || ''}\n Фамилия: ${user.last_name || ''}\n Ссылка: @${user.username}\n Телефон: ${phone} \nхочет купить:\n` +
    `${cart.map((elem, index) => `${index + 1}. ${elem.product.name} x ${elem.quantity} шт.`).join('\n')}\n` +
    `\nВ сумме: ${cart.reduce((acc, elem) => acc + elem.quantity * elem.product.price, 0)} грн.`

    await ctx.reply('Данные переданы админам! Ожидайте звонка или сообщения в телеграмме.');
    await bot.api.sendMessage(ADMIN_ID, replayText);

    return;
}