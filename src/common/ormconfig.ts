import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import path from 'path';
import { CustomMigration } from '../migrations/custom_migration';

dotenv.config({
    path: path.join(__dirname, '../../.env')
})

export const config = {
    type: "postgres",
    host: process.env['HOST'],
    port: process.env['POSTGRES_PORT'],
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    logging: false,
    migrationsTableName: 'custom_migration',
    entities: [__dirname + '/../entities/**/*.ts'],
    migrations: [CustomMigration],
    cli: {
        migrationsDir: 'src/migration',
        entitiesDir: 'src/entity'
    },
    subscribers: ['../../src/subscriber/**/*.ts'],
    autoReconnect: true,
    synchronize: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectionInterval: 1000
} as ConnectionOptions