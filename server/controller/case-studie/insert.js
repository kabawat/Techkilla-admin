const mega = require('megajs');
const { caseStudieModel } = require('../../connection');
const { MegaStorage, convertToSlug } = require('../../components/mega');
async function insertData(req, res) {
    try {
        const { MEGA_AUTH_EMAIL, MEGA_AUTH_PASSWORD, URL } = process.env
        const { main_heading, video_link, desc } = req.body
        const cart_them = req.file
        // console.log(req.file)
        const storage = mega({ email: MEGA_AUTH_EMAIL, password: MEGA_AUTH_PASSWORD, autoload: true });

        const cart_them_path = MegaStorage(cart_them, storage)
        const dataModale = new caseStudieModel({
            main_heading: main_heading,
            video_link: video_link ? video_link : '',
            desc: desc,
            cart_them: "/file/" + cart_them_path,
            slag: convertToSlug(main_heading),
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
module.exports = insertData