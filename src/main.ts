import { dataSource } from "./database/data-source";
import { bot } from "./bot";
import { config } from "dotenv";
import { ProductEntity } from "./database/entiy/product.entity";
config();

async function bootstrap() {
    dataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization: ", err)
        })

    bot.catch((err) => {
        console.error(err)
    });
    bot.start();

    console.log('Strated bot...');
}

bootstrap();