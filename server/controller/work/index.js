const { recentWorkModel } = require('../../connection');

async function readRecentWork(req, res) {
    try {
        const data = await recentWorkModel.find();
        res.status(200).json({
            data,
            url: process.env.URL,
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
