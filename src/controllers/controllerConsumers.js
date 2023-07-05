const pool = require('../database')
const joi = require('joi');

const idValidate = joi.object({
    id: joi.string().required().max(5),
});

const { viewAllConsumerModal, createConsumerModal, viewOneConsumerModal, viewAllDocumentsModal } = require('../modal/modalConsumer')


// Controller function to view all consumers   Route :  /consumer/view-all
const viewAllConsumers = async (req, res) => {
    try {
        const fetchConsumerList = await viewAllConsumerModal()
        if (fetchConsumerList && fetchConsumerList.length > 0) {
            res.status(201).json({ "status": true, message: "List of consumers", data: fetchConsumerList });
        } else {
            res.status(201).json({ "status": false, message: "Failed to get consumer lists", data: [] });
        }
    } catch (error) {
        console.error('Catch Error fetch doc lists consumers', error);
        res.status(500).json({ error: 'Internal Server Error controller consumer fetch ', msg: error });
    }
}

// Controller function to view documents of a consumer by consumer id  Route :  /consumer/documents
const viewDocsController = async (req, res) => {
    // Checking if body contains keys than must have moduleId other wise it will return error.
    if (Object.keys(req.body).length > 0 && !req.body.moduleId) return res.status(201).json({ "status": false, message: "Please Enter Correct key 'moduleId' or no body to view all. ", data: [] });
    try {
        const fetchConsumerList = await viewAllDocumentsModal(req.body)
        if (fetchConsumerList && fetchConsumerList.length > 0) {
            res.status(201).json({ "status": true, message: "List of Documents", data: fetchConsumerList });
        } else {
            res.status(201).json({ "status": false, message: "No Data Found", data: [] });
        }
    } catch (error) {
        console.error('Catch Error fetch doc lists Documents', error);
        res.status(500).json({ error: 'Internal Server Error Documents fetch ', msg: error });
    }
}

// Controller function to view a single consumer by ID
const viewOneConsumers = async (req, res) => {       ////   /consumer/view-one
    // Validation
    const { error, value } = idValidate.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(item => item.message);
        return res.status(400).json({ error: errorMessages });
    }

    const { id } = req.body;
    try {
        const fetchConsumerList = await viewOneConsumerModal(id)
        if (fetchConsumerList && fetchConsumerList.length > 0) {
            res.status(201).json({ "status": true, message: "Consumer Detail", data: fetchConsumerList });
        } else {
            res.status(201).json({ "status": false, message: "No Data Found", data: [] });
        }
    } catch (error) {
        console.error('Catch Error fetch doc lists consumers', error);
        res.status(500).json({ error: 'Internal Server Error controller consumer fetch ', msg: error });
    }
}

// Controller function to add a new consumer
const addNewConsumer = async (req, res) => {
    const { token, module } = req.body;
    try {
        const createConsumer = await createConsumerModal(token, module)
        console.log("createConsumer", createConsumer)
        if (createConsumer.success) {
            res.status(201).json({ "status": true, message: "Consumers Added Successfully", data: createConsumer });
        } else {
            res.status(201).json({ "status": false, message: "Failed to add consumer", data: createConsumer });
        }

    } catch (error) {
        console.error('Catch error adding consumers', error);
        res.status(500).json({ error: 'Internal Server Error controller adding consumer', msg: error.message });
    }
}


module.exports = { viewAllConsumers, addNewConsumer, viewOneConsumers, viewDocsController };