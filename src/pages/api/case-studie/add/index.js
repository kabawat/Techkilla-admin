import multer from 'multer';
import path from 'path';
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

function convertToSlug(string) {
    var charactersToRemove = /[/!@#$%^&*()?.,\s]/g;
    return string.replace(charactersToRemove, "-");
}
const handler = async (req, res) => {
    try {
        if (req?.method !== 'POST') {
            throw new Error('this Method is Allowed')
        }
        upload.fields([{ name: 'cart_them' }])(req, res, async (error) => {
            if (error) {
                res.status(500).json({ error: 'Failed to upload files' });
            } else {
                try {
                    const { files } = req;
                    if (!files) {
                        throw new Error('No files uploaded')
                    }
                    const cartThemFile = files['cart_them'][0];
                    if (!cartThemFile) {
                        throw new Error('Missing Cart Them file')
                    }
                    const { main_heading, desc, video_link } = req?.body
                    const cartThemFilePath = "/case-studie/" + cartThemFile.filename;
                    const dataModale = new caseStudie({
                        main_heading,
                        desc,
                        cart_them: cartThemFilePath,
                        video_link: video_link ? video_link : '',
                        slag: convertToSlug(main_heading)
                    })
                    const resData = await dataModale.save()
                    if (!resData) {
                        throw new Error("Case Studie Not saved")
                    }
                    res.status(200).json({
                        status: true,
                        message: "success",
                    })
                } catch (error) {
                    res.status(500).json({
                        status: false,
                        message: error?.message,
                        data: []
                    })
                }
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
