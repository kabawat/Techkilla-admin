const mega = require('megajs');
const path = require('path')
const { caseStudieModel } = require('../../connection');
const { MegaStorage } = require('../../components/mega');
function convertToSlug(string) {
    var charactersToRemove = /[/!@#$%^&*()?.,\s]/g;
    var cleanedString = string.replace(charactersToRemove, "");
    return cleanedString.slice(0, 10);
}

async function updateCaseStudie(req, res) {
    const { formType, heading, desc, id, url } = req?.body
    try {
        const { MEGA_AUTH_EMAIL, MEGA_AUTH_PASSWORD } = process.env
        const storage = mega({ email: MEGA_AUTH_EMAIL, password: MEGA_AUTH_PASSWORD, autoload: true });

        if (formType === "case-studie-info") {
            const { cover_page } = req?.files
            // thumbnail 
            const dataModale = {
                heading,
                cover_page: `/file/${MegaStorage(cover_page[0], storage)}`,
            }
            const isSave = await caseStudieModel.updateOne({ _id: id }, { ...dataModale })
            if (!isSave) {
                throw new Error("try again")
            }
        }

        // Case Studie Artical
        if (formType === "case-studie") {
            const { thumbnail } = req?.files
            const isData = await caseStudieModel.findOne({ _id: id }, 'case_studie')
            // thumbnail 
            const newData = [...isData?.case_studie, {
                heading,
                desc,
                thumbnail: `/file/${MegaStorage(thumbnail[0], storage)}`,
            }]
            const isUpdate = await caseStudieModel.updateOne({ _id: id }, { case_studie: newData })
        }

        // Use Case in Oder forment
        if (formType === "use_case_order") {
            const isData = await caseStudieModel.findOne({ _id: id }, 'use_case_oder')
            const newData = [...isData?.use_case_oder, req.body?.desc]
            await caseStudieModel.updateOne({ _id: id }, { use_case_oder: newData })
        }

        // Use Case in image forment
        if (formType === "use_case_image") {
            const { icon } = req?.files
            const isData = await caseStudieModel.findOne({ _id: id }, 'use_case_image')

            const newData = [...isData?.use_case_image, {
                heading,
                desc,
                icon: `/file/${MegaStorage(icon[0], storage)}`
            }]
            const isUpdate = await caseStudieModel.updateOne({ _id: id }, { use_case_image: newData })
        }


        // Case Studie Key Highlights
        if (formType === "KeyHighlights") {
            const { icon } = req?.files
            const isData = await caseStudieModel.findOne({ _id: id }, 'KeyHighlights')
            const newData = [...isData?.KeyHighlights, {
                heading,
                icon: `/file/${MegaStorage(icon[0], storage)}`
            }]
            const isUpdate = await caseStudieModel.updateOne({ _id: id }, { KeyHighlights: newData })
        }

        // Case Studie Key Highlights
        if (formType === "releted_project") {
            const { thumbnail } = req?.files
            const isData = await caseStudieModel.findOne({ _id: id }, 'releted_project')
            const newData = [...isData?.releted_project, {
                heading,
                thumbnail: `/file/${MegaStorage(thumbnail[0], storage)}`,
                url
            }]
            const isUpdate = await caseStudieModel.updateOne({ _id: id }, { releted_project: newData })
        }

        // Case Studie benefits
        if (formType === "benefits") {
            const { icon } = req?.files
            const { benefits_heading } = req?.body
            const isData = await caseStudieModel.findOne({ _id: id }, 'benefits  benefits_heading')
            const newData = [...isData?.benefits, {
                heading,
                icon: `/file/${MegaStorage(icon[0], storage)}`,
                desc
            }]
            const isUpdate = await caseStudieModel.updateOne({ _id: id }, { benefits: newData, benefits_heading: benefits_heading })
        }

        res.status(200).json({
            message: `update ${formType} successful`,
            status: true
        })
    } catch (error) {
        res.status(500).json({
            message: error?.message,
            status: false
        })
    }
}
module.exports = updateCaseStudie