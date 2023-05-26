const pool = require('../database')
const { viewAllConsumerModal, createConsumerModal } = require('../modal/modalConsumer')

const viewAllConsumers = async (req, res) => {       ////   /consumer/view-all
    try {
        const fetchConsumerList = await viewAllConsumerModal()
        if (fetchConsumerList) {
            res.status(201).json({ "status": true, message: "List of consumers", data: fetchConsumerList });
        } else {
            res.status(201).json({ "status": false, message: "Failed to get consumer lists", data: fetchConsumerList });
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
        }

    } catch (error) {
        console.error('Catch error adding consumers', error);
        res.status(500).json({ error: 'Internal Server Error controller adding consumer', msg: error });
    }
}


module.exports = { viewAllConsumers, addNewConsumer };