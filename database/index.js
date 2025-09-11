const dotenv = require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

let database;

module.exports = {
    initDb: callback => {
        if (database) {
            console.log('Database is already initialized!');
            return callback(null, database);
        }

        MongoClient.connect(process.env.MONGODB_URI)
            .then(client => {
                database = client.db();
                callback(null, database);
            })
            .catch(err => {
                callback(err);
            });
    },
    getDb: () => {
        if (!database) {
            throw Error('Database not initialized');
        }

        return database;
    }
};
