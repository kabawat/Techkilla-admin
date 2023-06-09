import multer from 'multer';
import path from 'path';
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
        if (req?.method !== 'POST') {
            throw new Error('this Method is Allowed')
        }
        upload.fields([{ name: 'logo' }, { name: 'thumbnail' }])(req, res, async (error) => {
            if (error) {
                res.status(500).json({ error: 'Failed to upload files' });
            } else {
                const { files } = req;
                if (!files) {
                    res.status(400).json({ error: 'No files uploaded' });
                    return;
                }

                const logoFile = files['logo'][0];
                const thumbnailFile = files['thumbnail'][0];

                if (!logoFile || !thumbnailFile) {
                    res.status(400).json({ error: 'Missing logo or thumbnail file' });
                    return;
                }
                const { heading, url } = req?.body
                const logoFilePath = "/recent-work/" + logoFile.filename;
                const thumbnailFilePath = "/recent-work/" + thumbnailFile.filename;
                const dataModale = new workModel({
                    logo: logoFilePath,
                    thumbnail: thumbnailFilePath,
                    heading: heading,
                    url: url,
                })

                const resData = await dataModale.save()
                if (!resData) {
                    throw new Error("Recent Work Not saved")
                }
                res.status(200).json({
                    status: true,
                    message: "success",
                    data: [
                        logoFilePath,
                        thumbnailFilePath
                    ]
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
