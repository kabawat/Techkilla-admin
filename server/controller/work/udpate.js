const mega = require('megajs');
const { recentWorkModel } = require('../../connection');
const { MegaStorage } = require('../../components/mega');
async function updateWork(req, res) {
    try {
        if (req.files) {
            const { thumbnail, logo } = req.files
            const { MEGA_AUTH_EMAIL, MEGA_AUTH_PASSWORD } = process.env
            const storage = mega({ email: MEGA_AUTH_EMAIL, password: MEGA_AUTH_PASSWORD, autoload: true });
            let data = {
                url: req.body?.url,
                heading: req?.body?.heading,
            }
            let thumbnail_image = ''
            let logo_image = ''

            const isExist = await recentWorkModel.findOne({ _id: req.body?.id }, 'thumbnail logo')
            if (!isExist) {
                throw new Error('data not Found')
            }

            if (thumbnail) {
                thumbnail_image = `/file/${MegaStorage(thumbnail[0], storage)}`;
            }

            if (logo) {
                logo_image = `/file/${MegaStorage(logo[0], storage)}`
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

        } else {
            const data = {
                url: req.body?.url,
                heading: req?.body?.heading
            }
            await recentWorkModel.findByIdAndUpdate({ _id: req.body?.id }, { ...data })
        }

        res.status(200).json({
            status: true,
            message: 'Recent Work Update Success...'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error?.message
        })
    }
}
module.exports = updateWork