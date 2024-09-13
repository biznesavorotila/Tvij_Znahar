import { MyContext } from "../../types";

export const payment = async (ctx: MyContext) => {
    await ctx.conversation.enter('askPhoneAndPay');
}