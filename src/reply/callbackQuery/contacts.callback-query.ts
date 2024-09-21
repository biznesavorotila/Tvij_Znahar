import { MyContext } from "../../types";
import text from '../../text.json';

export const contacts = async (ctx: MyContext) => {
    return await ctx.reply(text.command.text.contacts);
}