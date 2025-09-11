const mongodb = require('../database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    console.log('Get all contacts');
    const result =
        await mongodb.getDb().collection('contacts').find();

    result.toArray().then(contacts => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    })
}

const getById = async (req, res) => {
    console.log('Get contact by id: ' + req.params.id);
    const contactId = req.params.id;
    const result =
        await mongodb.getDb().collection('contacts').find({ _id: contactId });

    result.toArray().then(contacts => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    })
}

module.exports = {
    getAll,
    getById
};