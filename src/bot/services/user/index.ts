import { dataSource } from "../../../database/data-source";
import { UserEntity } from "../../../database/entity/user.entity";
import { TUpdatePhonoe, TUserCreate } from "./types";

export class UserService {
    static async save(user: Partial<TUserCreate>) {
        const exist = await dataSource.getRepository(UserEntity).exists({ where: { chat_id: user.chat_id } });
        if (!exist) 
            return await dataSource.getRepository(UserEntity).save(user);
    }

    static async updatePhone(data: TUpdatePhonoe) {
        return await dataSource.getRepository(UserEntity)
            .createQueryBuilder()
            .update(UserEntity)
            .set({ phone: data.phone })
            .where({ chat_id: data.chat_id })
            .execute();
    }

    static async getAll() {
        return await dataSource.getRepository(UserEntity).find();
    }
}