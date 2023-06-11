const { recentWorkModel } = require('../../connection')
const mega = require('megajs');
const { MegaStorage } = require('../../components/mega');

async function work(req, res) {
    try {
        const { MEGA_AUTH_EMAIL, MEGA_AUTH_PASSWORD } = process.env
        const { heading, url } = req.body
        const { logo, thumbnail } = req.files
        const storage = mega({ email: MEGA_AUTH_EMAIL, password: MEGA_AUTH_PASSWORD, autoload: true });

        const logo_image = MegaStorage(logo[0], storage)
        const thumbnail_image = MegaStorage(thumbnail[0], storage)
        const dataModale = new recentWorkModel({
            heading: heading,
            logo: "/file/" + logo_image,
            thumbnail: "/file/" + thumbnail_image,
            url: url,
        })

        const resData = await dataModale.save()
        if (!resData) {
            throw new Error("Recent Work Not saved")
        }

        setTimeout(() => {
            res.status(200).json({
                status: true,
                message: "success",
            })
        }, 3000)

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error?.message,
        })
    }
}

module.exports = work   
