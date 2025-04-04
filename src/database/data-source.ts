import { DataSource } from "typeorm";
import { config } from "dotenv";
config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

if (!host || !port || !username || !password || !dbName) {
    throw new Error('Missing database credentials!');
}

export const dataSource = new DataSource({
    type: 'postgres',
    host,
    port: Number(port),
    username,
    password,
    database: dbName,
    entities: ['src/database/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
})