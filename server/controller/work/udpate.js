const { unlinkSync } = require('fs')
const path = require('path')
const { recentWorkModel } = require('../')
async function updateWork(req, res) {
    try {
        if (req.files) {
            const { thumbnail, logo } = req.files
            let data = {
                url: req.body?.url,
                heading: req?.body?.heading,
            }
            const rootDir = path.dirname(require.main.filename);
            const isExist = await recentWorkModel.findOne({ _id: req.body?.id }, 'thumbnail logo')
            // thumbnail 
            let thumbnail_file_name = ''
            let thumbnail_filename = ''
            let thumbnail_saveFile = ''
            let thumbnail_image = ''

            // logo 
            let logo_file_name = ''
            let logo_filename = ''
            let logo_saveFile = ''
            let logo_image = ''


            if (thumbnail) {
                thumbnail_file_name = req?.body?.heading.split(' ').join('-')
                thumbnail_filename = `${thumbnail_file_name}-thumbnail-${new Date().getTime()}${path.extname(thumbnail?.name)}`
                thumbnail_saveFile = path.join(rootDir, `public/work/${thumbnail_filename}`);
                thumbnail_image = `/work/${thumbnail_filename}`;
            }

            if (logo) {
                logo_file_name = req?.body?.heading.split(' ').join('-')
                logo_filename = `${logo_file_name}-logo-${new Date().getTime()}${path.extname(logo?.name)}`
                logo_saveFile = path.join(rootDir, `public/work/${logo_filename}`);
                logo_image = `/work/${logo_filename}`;
            }

            if (thumbnail && logo) {
                data = {
                    ...data,
                    thumbnail: thumbnail_image,
                    logo: logo_image
                }
            } else if (thumbnail) {
                data = {
                    ...data,
                    thumbnail: thumbnail_image,
                }
            } else {
                data = {
                    ...data,
                    logo: logo_image
                }
            }

            const isUpdate = await recentWorkModel.findByIdAndUpdate({ _id: req.body?.id }, { ...data })
            if (!isUpdate) {
                throw new Error('something wrong! try some time later.')
            }
            if (thumbnail) {
                thumbnail.mv(thumbnail_saveFile);
                const fileDir = path.join(rootDir, `public/${isExist?.thumbnail}`)
                unlinkSync(fileDir)
            }
            if (logo) {
                logo.mv(logo_saveFile);
                const fileDir = path.join(rootDir, `public/${isExist?.logo}`)
                unlinkSync(fileDir)
            }
        } else {
            const data = {
                url: req.body?.url,
                heading: req?.body?.heading
            }
            await recentWorkModel.findByIdAndUpdate({ _id: req.body?.id }, { ...data })
        }
        res.status(200).json({
            status: true,
            message: 'success'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error?.message
        })
    }
}
module.exports = updateWork