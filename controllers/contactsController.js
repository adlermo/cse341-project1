const mongodb = require('../database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Get all contacts'
    console.log('Get all contacts');
    const result =
        await mongodb.getDb().collection('contacts').find();

    result.toArray().then(contacts => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    })
}

const getById = async (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Get contact by id'
    console.log(`Get contact by id: ${req.params.id}`);
    const contactId = new ObjectId(req.params.id);
    const result =
        await mongodb.getDb().collection('contacts').find({ _id: contactId });

    result.toArray().then(contacts => {
        if (contacts.length == 0) {
            return res.status(404).send();
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    })
}

const createContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Create a new contact'
    console.log('Create a new contact');

    const { name, surname, email, phone } = req.body;

    if (!name || !surname || !email || !phone) {
        return res.status(400).json({ error: 'All fields are required: name, surname, email, phone' });
    }

    const contact = {
        name,
        surname,
        email,
        phone
    };

    const response = await mongodb.getDb().collection('contacts').insertOne(contact);

    if (!response.acknowledged) {
        return res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }

    res.status(201).json(response);
}

const updateContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Update an existing contact'
    const contactId = new ObjectId(req.params.id);
    console.log(`Update contact with id: ${contactId}`);

    const { name, surname, email, phone } = req.body;

    if (!name || !surname || !email || !phone) {
        return res.status(400).json({ error: 'All fields are required: name, surname, email, phone' });
    }

    const contact = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone
    };

    const response = await mongodb.getDb().collection('contacts').replaceOne({ _id: contactId }, contact);
    console.log(response);

    if (response.modifiedCount == 0) {
        return res.status(404).send();
    }

    res.status(204).send();
}

const deleteContact = async (req, res) => {
    // #swagger.tags = ['Contacts']
    // #swagger.description = 'Delete a contact'
    const contactId = new ObjectId(req.params.id);
    console.log(`Delete contact with id: ${contactId}`);

    const response = await mongodb.getDb().collection('contacts').deleteOne({ _id: contactId }, true);
    console.log(response);

    if (response.deletedCount == 0) {
        return res.status(404).send();
    }

    res.status(204).send();
}

module.exports = {
    getAll,
    getById,
    createContact,
    updateContact,
    deleteContact
};