const express = require('express');
const mongodb = require('./database');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.locals.mongodb = mongodb;
        app.listen(port, () => {
            console.log(`Connected to DB and running on http://localhost:${port}`);
        });
    }
});
