import { type Conversation, type ConversationFlavor } from "@grammyjs/conversations";
import { Context, SessionFlavor } from "grammy";

export interface SessionData {
    conversation: { [key: string]: any };  // To store conversations, or other session data
}

export type MyContext = Context & ConversationFlavor & SessionFlavor<SessionData>;
export type MyConversation = Conversation<MyContext>;

export enum EInlineKeyboard {
    CATALOG = 'catalog-command',
    CART = 'cart-command',
    ABOUT_US = 'about-us-command',
    PRODUCT = 'product-command',
    ADD_TO_CART = 'add-to-cart-command',
    REMOVE_FROM_CART = 'remove-from-cart-command',
    PAYMENT = 'payment-command',
}