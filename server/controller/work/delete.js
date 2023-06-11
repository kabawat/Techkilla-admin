const { recentWorkModel } = require('../../connection')
async function deleteWork(req, res) {
    try {
        const isExist = await recentWorkModel.findOne({ _id: req.query.id })
        if (!isExist) {
            throw new Error('data Not Exists')
        }

        const isRemove = await recentWorkModel.deleteOne({ _id: req.query.id })
        if (!isRemove) {
            throw new Error('data not deleted try again')
        }
        res.status(200).json({
            status: true,
            message: 'success'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error?.message
        })
    }
}
module.exports = deleteWork