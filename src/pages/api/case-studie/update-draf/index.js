import multer from 'multer';
import path from 'path';
import { unlinkSync } from 'fs'
import caseStudie from '@/models/case-studie'
import connectDB from '@/middleware/connection';
const uploadDir = path.join(process.cwd(), 'public', "case-studie");
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        const fileName = `${uniqueSuffix}${fileExtension}`;
        cb(null, fileName);
    },
});

// Create the multer upload instance
const upload = multer({ storage });
export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    try {
        if (req?.method !== 'PUT') {
            throw new Error('this Method is Allowed')
        }
        upload.fields([{ name: 'cover_page' }, { name: 'thumbnail' }, { name: 'icon' }])(req, res, async (error) => {
            if (error) {
                res.status(500).json({ error});
            } else {
                const { files } = req;
                if (files?.cover_page) {
                    let cover_pageFile = files['cover_page'][0];
                    let dataModale = {
                        heading: req?.body?.heading,
                        cover_page: "/case-studie/" + cover_pageFile.filename,
                    }
                    const isSave = await caseStudie.updateOne({ _id: req?.body?.id }, { ...dataModale })
                    if (!isSave) {
                        throw new Error("try again")
                    }
                }

                // Case Studie Artical
                if (req?.body?.formType === "case_studie") {
                    let thumbnailFile = files['thumbnail'][0];
                    const isData = await caseStudie.findOne({ _id: req?.body?.id }, 'case_studie')
                    let dataModale = [...isData?.case_studie, {
                        heading: req?.body?.heading,
                        desc: req?.body?.desc,
                        thumbnail: "/case-studie/" + thumbnailFile.filename,
                    }]
                    const isSave = await caseStudie.updateOne({ _id: req?.body?.id }, { case_studie: dataModale })
                    if (!isSave) {
                        throw new Error("try again")
                    }
                }

                // Use Case in Oder format
                if (req?.body?.formType === "use_case_order") {
                    const isData = await caseStudie.findOne({ _id: req?.body?.id }, 'use_case_oder')
                    let dataModale = [...isData?.use_case_oder, req?.body?.desc]
                    const isSave = await caseStudie.updateOne({ _id: req?.body?.id }, { use_case_oder: dataModale })
                    if (!isSave) {
                        throw new Error("try again")
                    }
                }

                // Use Case in image
                if (req?.body?.formType === "use_case_image") {
                    let iconFile = files['icon'][0];
                    const isData = await caseStudie.findOne({ _id: req?.body?.id }, 'use_case_image')
                    let dataModale = [...isData?.use_case_image, {
                        desc: req?.body?.desc,
                        heading: req?.body?.heading,
                        icon: "/case-studie/" + iconFile.filename,
                    }]
                    const isSave = await caseStudie.updateOne({ _id: req?.body?.id }, { use_case_image: dataModale })
                    if (!isSave) {
                        throw new Error("try again")
                    }
                }

                // Case Studie Key Highlights
                if (req?.body?.formType === "KeyHighlights") {
                    let iconFile = files['icon'][0];
                    const isData = await caseStudie.findOne({ _id: req?.body?.id }, 'KeyHighlights')
                    let dataModale = [...isData?.KeyHighlights, {
                        heading: req?.body?.heading,
                        icon: "/case-studie/" + iconFile.filename,
                    }]
                    const isSave = await caseStudie.updateOne({ _id: req?.body?.id }, { KeyHighlights: dataModale })
                    if (!isSave) {
                        throw new Error("try again")
                    }
                }

                // Case studie releted project
                if (req?.body?.formType === 'releted_project') {
                    let thumbnailFile = files['thumbnail'][0];
                    const isData = await caseStudie.findOne({ _id: req?.body?.id }, 'releted_project')
                    let dataModale = [...isData?.releted_project, {
                        heading: req?.body?.heading,
                        thumbnail: "/case-studie/" + thumbnailFile.filename,
                    }]
                    const isSave = await caseStudie.updateOne({ _id: req?.body?.id }, { releted_project: dataModale })
                    if (!isSave) {
                        throw new Error("try again")
                    }
                }

                // Case studie releted project
                if (req?.body?.formType === 'benefits') {
                    let iconFile = files['icon'][0];
                    const isData = await caseStudie.findOne({ _id: req?.body?.id }, 'benefits')
                    let dataModale = [...isData?.benefits, {
                        desc: req?.body?.desc,
                        heading: req?.body?.heading,
                        benefits_heading: req?.body?.benefits_heading,
                        icon: "/case-studie/" + iconFile.filename,
                    }]
                    const isSave = await caseStudie.updateOne({ _id: req?.body?.id }, { benefits: dataModale })
                    if (!isSave) {
                        throw new Error("try again")
                    }
                }



                res.status(200).json({
                    status: true,
                    message: "success",
                })
            }
        });
    } catch (error) {
        res.status(409).json({
            status: false,
            message: error?.message,
            data: []
        })
    }
};

export default connectDB(handler);
