import caseStudie from '@/models/case-studie'
import connectDB from '@/middleware/connection';
async function handler(req, res) {
    try {
        const isData = await caseStudie.findOne({ _id: req?.body?.id }, "status")
        if (isData === null) {
            res.status(200).json({
                message: "no data found",
                status: false,
                data: []
            })
        } else {
            const isData = await caseStudie.updateOne({ _id: req?.body?.id }, { status: true })
            res.status(200).json({
                message: "Publish Post success",
                status: true,
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