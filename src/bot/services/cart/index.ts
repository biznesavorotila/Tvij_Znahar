import { dataSource } from "../../../database/data-source";
import { CartEntity } from "../../../database/entity/cart.entity";

export class CartService {
    public static async addToCart(cart: { quantity: number, userId: string, product: number }) {
        return await dataSource
            .createQueryBuilder()
            .insert()
            .into(CartEntity)
            .values({ quantity: cart.quantity, userId: cart.userId, product: { id: cart.product } })
            .execute();
    }

    public static async getSpecCart(userId: string, productId: number) {
        return await dataSource
            .getRepository(CartEntity)
            .createQueryBuilder('cart')
            .where('cart.userId = :userId', { userId })
            .andWhere('cart.product = :productId', { productId })
            .leftJoinAndSelect('cart.product', 'product')
            .getOne();
    } 

    public static async getCartElem(cartId: number) {
        return await dataSource
            .getRepository(CartEntity)
            .createQueryBuilder('cart')
            .where('cart.id = :cartId', { cartId })
            .leftJoinAndSelect('cart.product', 'product')
            .getOneOrFail();
    }

    public static async updateQuantity(cart: CartEntity, quantity: number) {
        return await dataSource
            .getRepository(CartEntity)
            .save({ ...cart, quantity });
    } 

    public static async getUserCart(userId: string) {
        return await dataSource
            .getRepository(CartEntity)
            .createQueryBuilder('cart')
            .where('cart.userId = :userId', { userId })
            .leftJoinAndSelect('cart.product', 'product')
            .getMany();
    }

    public static async deleteCartById(cartId: number) {
        return await dataSource
            .getRepository(CartEntity)
            .createQueryBuilder()
            .delete()
            .from(CartEntity)
            .where('id = :cartId', { cartId })
            .execute(); 
    }

    public static async deleteCart(cart: CartEntity) {
        return await dataSource
            .getRepository(CartEntity)
            .createQueryBuilder('cart')
            .where(cart)
            .delete();
    }
}