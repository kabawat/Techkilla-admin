import caseStudie from '@/models/case-studie'
import connectDB from '@/middleware/connection';
async function handler(req, res) {
    try {
        if (req?.method !== "GET") {
            throw new Error('method not allowed')
        }
        const isData = await caseStudie.findOne({ status: false })
        if (isData === null) {
            res.status(200).json({
                message: "no data found",
                status: false,
                data: []
            })
        } else {
            res.status(200).json({
                message: "data found",
                status: true,
                data: isData
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            status: false,
            data: []
        })
    }
}
export default connectDB(handler);