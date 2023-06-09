import caseStudie from '@/models/case-studie'
import connectDB from '@/middleware/connection';
async function handler(req, res) {
    try {
        if (req?.method !== "GET") {
            throw new Error('method not allowed')
        }
        const isData = await caseStudie.find({ status: true }, 'heading date ')
        if (!isData) {
            throw new Error('no data found')
        }
        res.status(200).json({
            message: "success",
            status: true,
            data: isData,
            url: process.env.url
        })
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            status: false,
            data: []
        })
    }
}
export default connectDB(handler);