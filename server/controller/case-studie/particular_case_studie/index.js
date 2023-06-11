const { caseStudieModel } = require('../../')

async function particular_case_studie(req, res) {
    try {
        const isData = await caseStudieModel.findOne({ _id: req.params.id })
        res.status(200).json({
            data: isData,
            status: true
        })
    } catch (error) {
        res.status(200).json({
            data: [],
            status: false,
            message: error?.message
        })
    }
}

module.exports = particular_case_studie