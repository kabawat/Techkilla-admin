const { unlinkSync } = require('fs')
const path = require('path')
const { recentWorkModel } = require('../')
async function deleteWork(req, res) {
    try {
        const rootDir = path.dirname(require.main.filename);
        const isExist = await recentWorkModel.findOne({ _id: req.query.id })
        if (!isExist) {
            throw new Error('data Not Exists')
        }

        const isRemove = await recentWorkModel.deleteOne({ _id: req.query.id })
        if (!isRemove) {
            throw new Error('data not deleted try again')
        }
        const logo = path.join(rootDir, `public/${isExist?.logo}`)
        const thumbnail = path.join(rootDir, `public/${isExist?.thumbnail}`)
        unlinkSync(logo)
        unlinkSync(thumbnail)

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