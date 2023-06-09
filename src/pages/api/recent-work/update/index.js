import multer from 'multer';
import path from 'path';
import { unlinkSync } from 'fs'
import workModel from '@/models/work'
import connectDB from '@/middleware/connection';
const uploadDir = path.join(process.cwd(), 'public', "recent-work");
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
        upload.fields([{ name: 'logo' }, { name: 'thumbnail' }])(req, res, async (error) => {
            if (error) {
                res.status(500).json({ error: 'Failed to upload files' });
            } else {
                const isExist = await workModel.findOne({ _id: req.body?.id }, 'thumbnail logo')
                const { files } = req;
                let data = {}
                let logoFile;

                if (files?.logo) {
                    logoFile = files['logo'][0];
                    data = {
                        ...data,
                        logo: "/recent-work/" + logoFile.filename
                    }
                }

                let thumbnailFile;
                if (files?.thumbnail) {
                    thumbnailFile = files['thumbnail'][0];
                    data = {
                        ...data,
                        thumbnail: "/recent-work/" + thumbnailFile.filename,
                    }
                }
                data = {
                    ...data,
                    url: req.body?.url,
                    heading: req?.body?.heading,
                }

                const isUpdate = await workModel.findByIdAndUpdate({ _id: req.body?.id }, { ...data })
                if (!isUpdate) {
                    throw new Error("Recent Work Not update")
                }
                if (!isUpdate) {
                    throw new Error('something wrong! try some time later.')
                }
                if (thumbnailFile) {
                    const fileDir = path.join(process.cwd(), 'public/', `${isExist?.thumbnail}`)
                    unlinkSync(fileDir)
                }
                if (logoFile) {
                    const fileDir = path.join(process.cwd(), 'public/', `${isExist?.logo}`)
                    unlinkSync(fileDir)
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
