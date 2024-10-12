import { bot } from "../../../bot/bot";
import { UserService } from "../../../bot/services/user";
import { TCreatePost } from "./types";

class PostService {
    async createPost(newPost: TCreatePost) {
        // get all users
        const users = await UserService.getAll();

        // send to every user
        for (const user of users) {
            bot.api.sendPhoto(user.chat_id, `http://localhost:5001/uploads/${newPost.image}`);
            bot.api.sendMessage(user.chat_id, newPost.text, { parse_mode: 'HTML' });
        }

    }
}

export default new PostService();