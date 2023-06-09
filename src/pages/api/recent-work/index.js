import workModel from '@/models/work'
import connectDB from '@/middleware/connection';
const handler = async (req, res) => {
    try {
        if (req?.method !== "GET") {
            throw new Error('method not allowed')
        }
        const isExist = await workModel.find()
        const data = isExist?.map(item => {
            const { _id, heading, logo, thumbnail, url } = item
            return { _id, heading, logo, thumbnail, url }
        })
        res.status(200).json({
            status: true,
            data: data,
            message: 'success'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: [],
            message: error?.message
        })
    }
}

export default connectDB(handler)