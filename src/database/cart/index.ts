import { dataSource } from "../data-source";
import { CartEntity } from "../entiy/cart.entity";
import { ProductEntity } from "../entiy/product.entity";

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
}