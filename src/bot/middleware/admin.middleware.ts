import { Context, NextFunction } from "grammy";

export const adminMiddleware = async (ctx: Context, next: NextFunction) => {
    // TODO: check if user is admin
}