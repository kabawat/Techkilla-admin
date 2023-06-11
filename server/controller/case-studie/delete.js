const { unlinkSync } = require('fs')
const path = require('path')
const { caseStudieModel } = require('../')
async function deleteCaseStudie(req, res) {
    try {
        const rootDir = path.dirname(require.main.filename);
        const isExist = await caseStudieModel.findOne({ _id: req.body.id })
        if (!isExist) {
            throw new Error('data not found')
        }
        const isRemove = await caseStudieModel.deleteOne({ _id: req.body.id })
        if (!isRemove) {
            throw new Error('data not deleted try again')
        }
        const file = path.join(rootDir, `public/${isExist?.cover_page}`)
        unlinkSync(file)
        isExist.case_studie.forEach((item) => {
            const file = path.join(rootDir, `public/${item.thumbnail}`)
            unlinkSync(file)
        });

        isExist.use_case_image.forEach((item) => {
            const file = path.join(rootDir, `public/${item.icon}`)
            unlinkSync(file)
        });

        isExist.KeyHighlights.forEach((item) => {
            const file = path.join(rootDir, `public/${item.icon}`)
            unlinkSync(file)
        });

        isExist.releted_project.forEach((item) => {
            const file = path.join(rootDir, `public/${item.thumbnail}`)
            unlinkSync(file)
        });

        isExist.benefits.forEach((item) => {
            const file = path.join(rootDir, `public/${item.icon}`)
            unlinkSync(file)
        });

        res.status(200).json({
            message: "delete success",
            status: true,
        })
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            status: false,
        })
    }
}
module.exports = deleteCaseStudie