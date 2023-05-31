const path = require('path')
const { caseStudieModel } = require('../')
function convertToSlug(string) {
    // Remove symbols and convert to lowercase
    let slug = string.replace(/[^\w\s]+/g, '').toLowerCase();

    // Replace spaces with hyphens
    slug = slug.replace(/\s+/g, '-');

    return slug.slice(0, 10)
}

async function updateCaseStudie(req, res) {
    const { formType, heading, desc, id, url } = req?.body
    try {

        if (formType === "case-studie-info") {
            const rootDir = path.dirname(require.main.filename);
            const { cover_page } = req?.files
            // thumbnail 
            const cover_page_file_name = convertToSlug(heading)
            const cover_page_filename = `${cover_page_file_name}-cover_page-${new Date().getTime()}${path.extname(cover_page.name)}`
            const cover_page_saveFile = path.join(rootDir, `public/case-studie/${cover_page_filename}`);
            const cover_page_image = `/case-studie/${cover_page_filename}`;
            const dataModale = {
                heading,
                cover_page: cover_page_image,
                slag: "/" + cover_page_file_name
            }
            const isSave = await caseStudieModel.updateOne({ _id: id }, { ...dataModale })
            if (!isSave) {
                throw new Error("try again")
            }
            cover_page.mv(cover_page_saveFile)
        }

        // Case Studie Artical
        if (formType === "case-studie") {
            const { thumbnail } = req?.files
            const isData = await caseStudieModel.findOne({ _id: id }, 'case_studie')
            const rootDir = path.dirname(require.main.filename);
            // thumbnail 
            var thumbnail_file_name = convertToSlug(heading);

            const thumbnail_filename = `${thumbnail_file_name}-thumbnail-${new Date().getTime()}${path.extname(thumbnail.name)}`
            const thumbnail_saveFile = path.join(rootDir, `public/case-studie/${thumbnail_filename}`);
            const thumbnail_image = `/case-studie/${thumbnail_filename}`;

            const newData = [...isData?.case_studie, {
                heading,
                desc,
                thumbnail: thumbnail_image
            }]
            const isUpdate = await caseStudieModel.updateOne({ _id: id }, { case_studie: newData })
            thumbnail.mv(thumbnail_saveFile)
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
            const rootDir = path.dirname(require.main.filename);
            // icon 
            const icon_file_name = convertToSlug(heading);

            const icon_filename = `${icon_file_name}-icon-${new Date().getTime()}${path.extname(icon.name)}`
            const icon_saveFile = path.join(rootDir, `public/case-studie/${icon_filename}`);
            const icon_image = `/case-studie/${icon_filename}`;

            const newData = [...isData?.use_case_image, {
                heading,
                desc,
                icon: icon_image
            }]
            const isUpdate = await caseStudieModel.updateOne({ _id: id }, { use_case_image: newData })
            icon.mv(icon_saveFile)
        }


        // Case Studie Key Highlights
        if (formType === "KeyHighlights") {
            const { icon } = req?.files
            const isData = await caseStudieModel.findOne({ _id: id }, 'KeyHighlights')
            const rootDir = path.dirname(require.main.filename);
            // icon 
            const icon_file_name = convertToSlug(heading);

            const icon_filename = `${icon_file_name}-icon-${new Date().getTime()}${path.extname(icon.name)}`
            const icon_saveFile = path.join(rootDir, `public/case-studie/${icon_filename}`);
            const icon_image = `/case-studie/${icon_filename}`;

            const newData = [...isData?.KeyHighlights, {
                heading,
                icon: icon_image
            }]
            const isUpdate = await caseStudieModel.updateOne({ _id: id }, { KeyHighlights: newData })
            icon.mv(icon_saveFile)
        }

        // Case Studie Key Highlights
        if (formType === "releted_project") {
            const { thumbnail } = req?.files
            const isData = await caseStudieModel.findOne({ _id: id }, 'releted_project')
            const rootDir = path.dirname(require.main.filename);
            // icon 
            const thumbnail_file_name = convertToSlug(heading);
            const thumbnail_filename = `${thumbnail_file_name}-thumbnail-${new Date().getTime()}${path.extname(thumbnail.name)}`
            const thumbnail_saveFile = path.join(rootDir, `public/case-studie/${thumbnail_filename}`);
            const thumbnail_image = `/case-studie/${thumbnail_filename}`;

            const newData = [...isData?.releted_project, {
                heading,
                thumbnail: thumbnail_image,
                url
            }]
            const isUpdate = await caseStudieModel.updateOne({ _id: id }, { releted_project: newData })
            thumbnail.mv(thumbnail_saveFile)
        }

        // Case Studie benefits
        if (formType === "benefits") {
            const { icon } = req?.files
            const { benefits_heading } = req?.body
            const isData = await caseStudieModel.findOne({ _id: id }, 'benefits  benefits_heading')
            const rootDir = path.dirname(require.main.filename);
            // icon 
            const icon_file_name = convertToSlug(heading);
            const icon_filename = `${icon_file_name}-icon-${new Date().getTime()}${path.extname(icon.name)}`
            const icon_saveFile = path.join(rootDir, `public/case-studie/${icon_filename}`);
            const icon_image = `/case-studie/${icon_filename}`;

            const newData = [...isData?.benefits, {
                heading,
                icon: icon_image,
                desc
            }]
            const isUpdate = await caseStudieModel.updateOne({ _id: id }, { benefits: newData, benefits_heading: benefits_heading })
            icon.mv(icon_saveFile)
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