import { dataSource } from "./database/data-source";
import { bot } from "./bot/bot";
import { config } from "dotenv";
import express from 'express';
import path from "path";
import { router } from "./admin/router";
import cors from "cors";
config();

const app = express();

app.use(cors({
  origin: 'https://tvijznaharadmin-production.up.railway.app',
  methods: ['GET','POST','PATCH','PUT','DELETE'],
//   allowedHeaders: ['Content-Type','Authorization'],
}));
app.use(express.json());
app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function bootstrap() {
    // init database connection
    dataSource.initialize()
        .then(() => {
            console.log("Data Source (db) has been initialized! ✅")

            // init bot
            bot.catch(async (err) => {
                console.error(err);
                await err.ctx.reply(`Произошла ошибка! ${Date.now().toLocaleString()}\n${err.message}\n${err?.cause}`);
            });
            bot.start().catch((err) => {
                console.error(err)
            });
            console.log("Bot has been initialized! ✅")

            // init server
            app.listen(process.env.PORT, () => console.log(`Admin server has been initialized ✅`))
        })
        .catch((err) => console.error("Error during Data Source initialization: ", err));
}

bootstrap();