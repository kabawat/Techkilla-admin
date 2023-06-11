const dt = require('dotenv').config()

const { caseStudieModel } = require('../../connection')
async function case_studie_draf(req, res) {
    try {
        const isData = await caseStudieModel.findOne({ status: false })
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

async function case_studie_publish(req, res) {
    try {
        const isData = await caseStudieModel.findOne({ _id: req?.body?.id }, "status")
        if (isData === null) {
            res.status(200).json({
                message: "no data found",
                status: false,
                data: []
            })
        } else {
            const isData = await caseStudieModel.updateOne({ _id: req?.body?.id }, { status: true })
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

async function all_case_studie(req, res) {
    try {
        const isData = await caseStudieModel.find({ status: true }, 'heading date ')
        if (!isData) {
            throw new Error('no data found')
        }
        res.status(200).json({
            message: "Publish Post success",
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

module.exports = { case_studie_publish, case_studie_draf, all_case_studie }