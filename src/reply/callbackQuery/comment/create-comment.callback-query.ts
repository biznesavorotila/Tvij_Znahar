import { MyContext } from "../../../types";

export const createComment = async (ctx: MyContext) => {
    await ctx.conversation.enter('askComment');
}