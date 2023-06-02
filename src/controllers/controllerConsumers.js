const pool = require('../database')
const joi = require('joi');

const idValidate = joi.object({
    id: joi.string().required().max(5),
});

const { viewAllConsumerModal, createConsumerModal, viewOneConsumerModal } = require('../modal/modalConsumer')

const viewAllConsumers = async (req, res) => {       ////   /consumer/view-all
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
const viewOneConsumers = async (req, res) => {       ////   /consumer/view-one

    const { error, value } = idValidate.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(item => item.message);  //Collection Errors
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

const addNewConsumer = async (req, res) => {
    const { token, module } = req.body;
    try {
        const createConsumer = createConsumerModal(token, module)
        if (createConsumer) {
            res.status(201).json({ "status": true, message: "Consumers Added Successfully", data: createConsumer });
        } else {
            res.status(201).json({ "status": false, message: "Failed to add consumer", data: createConsumer });
        }

    } catch (error) {
        console.error('Catch error adding consumers', error);
        res.status(500).json({ error: 'Internal Server Error controller adding consumer', msg: error });
    }
}


module.exports = { viewAllConsumers, addNewConsumer, viewOneConsumers };