const { recentWorkModel } = require('../');

async function readRecentWork(req, res) {
    try {
        const data = await recentWorkModel.find();

        res.status(200).json({
            data,
            url: 'http://localhost:2917',
            status: true
        });
    } catch (error) {
        res.status(500).json({
            data: [],
            status: false,
            message: error?.message
        });
    }
}

module.exports = readRecentWork;
