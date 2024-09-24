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
    CART_ELEM_INFO = 'cart-elem-info-command',
    REMOVE_ONE_FROM_CART = 'remove-from-cart-command',
    DELETE_FROM_CART = 'remove-from-cart-command',
    
    PAYMENT = 'payment-command',
    COMMENTS = 'comments-command',
    CREATE_COMMENT = 'create-comment-command',
    VIEW_COMMENTS = 'view-comments-command',
    ACCEPT_COMMENT = 'accept-comment-command',
    REJECT_COMMENT = 'reject-comment-command',
    CONTACTS = 'contacts-command',
}