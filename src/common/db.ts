import {getConnection, createConnection} from 'typeorm';

import {config} from './ormconfig';

const connectToDB = async() => {
    let connection;
    try {
        connection = getConnection();
    } catch (err) {
        console.log(err);
    }
    try {
        if (connection) {
            if (!connection.isConnected) {
                await connection.connect();
            }
        } else {
            await createConnection(config);
            console.log('Successfully connected!');
        }
    } catch (err) {
        console.log(err);
    }
}

export const TryDBConnect = async(callback: ()=>void): Promise<void> => {
    try {
        await connectToDB();
        callback();
    } catch (err) {
        console.log('DB Connection Error! ', err)
    }
}