import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import path from 'path';

dotenv.config({
    path: path.join(__dirname, '../../.env')
})

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env['POSTGRES_HOST'],
    port: Number(process.env['POSTGRES_PORT']),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    logging: false,
    entities: [`${__dirname}/../entities/**/*.ts`],
    migrations: [`${__dirname}/../migrations/**/*.ts`],
    cli: {
        migrationsDir: 'src/migrations',
        entitiesDir: 'src/entities'
    },
    subscribers: ['../../src/subscriber/**/*.ts'],
    synchronize: false,
}

export = config;