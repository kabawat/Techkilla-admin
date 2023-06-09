import caseStudie from '@/models/case-studie'
import connectDB from '@/middleware/connection';
import path from 'path'
import { unlinkSync } from 'fs'
async function deleteWork(req, res) {
    try {
        if (req?.method !== "PUT") {
            throw new Error('method not allowed')
        }
        const isExist = await caseStudie.findOne({ _id: req.body.id })
        if (!isExist) {
            throw new Error('data not found')
        }
        const isRemove = await caseStudie.deleteOne({ _id: req.body.id })
        if (!isRemove) {
            throw new Error('data not deleted try again')
        }
        const cover_page = path.join(process.cwd(), '/public', `${isExist?.cover_page}`)
        unlinkSync(cover_page)

        const cart_them = path.join(process.cwd(), '/public', `${isExist?.cart_them}`)
        unlinkSync(cart_them)

        isExist.case_studie.forEach((item) => {
            const file = path.join(process.cwd(), '/public', `${item.thumbnail}`)
            unlinkSync(file)
        });

        isExist.use_case_image.forEach((item) => {
            const file = path.join(process.cwd(), '/public', `${item.icon}`)
            unlinkSync(file)
        });

        isExist.KeyHighlights.forEach((item) => {
            const file = path.join(process.cwd(), '/public', `${item.icon}`)
            unlinkSync(file)
        });

        isExist.releted_project.forEach((item) => {
            const file = path.join(process.cwd(), '/public', `${item.thumbnail}`)
            unlinkSync(file)
        });

        isExist.benefits.forEach((item) => {
            const file = path.join(process.cwd(), '/public', `${item.icon}`)
            unlinkSync(file)
        });

        res.status(200).json({
            message: "delete success",
            status: true,
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error?.message
        })
    }
}
module.exports = connectDB(deleteWork)