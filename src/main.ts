import { dataSource } from "./database/data-source";
import { bot } from "./bot/bot";
import { config } from "dotenv";
import express from 'express';
import path from "path";
import { router } from "./admin/router";
import cors from "cors";
config();

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }))
app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function bootstrap() {
    // init database connection
    dataSource.initialize()
        .then(() => console.log("Data Source (db) has been initialized! ✅"))
        .catch((err) => console.error("Error during Data Source initialization: ", err));

    // init bot
    bot.start().catch((err) => {
        console.error(err)
    });
    console.log("Bot has been initialized! ✅")

    // init server
    app.listen(process.env.PORT, () => console.log(`Admin server has been initialized ✅`));

}

bootstrap();