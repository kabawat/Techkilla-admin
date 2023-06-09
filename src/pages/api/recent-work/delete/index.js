import workModel from '@/models/work'
import connectDB from '@/middleware/connection';
import { unlinkSync } from 'fs'
import path from 'path'
async function deleteWork(req, res) {
    try {
        if (req?.method !== "PUT") {
            throw new Error('method not allowed')
        }
        const isExist = await workModel.findOne({ _id: req.body.id })
        if (!isExist) {
            throw new Error('data Not Exists')
        }

        const isRemove = await workModel.deleteOne({ _id: req.body.id })
        if (!isRemove) {
            throw new Error('data not deleted try again')
        }
        const logo = path.join(process.cwd(), '/public', `${isExist?.logo}`)
        const thumbnail = path.join(process.cwd(), '/public', `${isExist?.thumbnail}`)
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
module.exports = connectDB(deleteWork)