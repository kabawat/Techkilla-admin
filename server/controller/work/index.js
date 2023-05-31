const { recentWorkModel } = require('../')
const path = require('path')
async function work(req, res) {
    const { heading, url } = req.body
    const { logo, thumbnail } = req.files

    try {
        const rootDir = path.dirname(require.main.filename);

        // thumbnail 
        const thumbnail_file_name = heading.split(' ').join('-')
        const thumbnail_filename = `${thumbnail_file_name}-thumbnail-${new Date().getTime()}${path.extname(thumbnail.name)}`
        const thumbnail_saveFile = path.join(rootDir, `public/work/${thumbnail_filename}`);
        const thumbnail_image = `/work/${thumbnail_filename}`;

        // logo 
        const logo_file_name = heading.split(' ').join('-')
        const logo_filename = `${logo_file_name}-logo-${new Date().getTime()}${path.extname(thumbnail.name)}`
        const logo_saveFile = path.join(rootDir, `public/work/${logo_filename}`);
        const logo_image = `/work/${logo_filename}`;

        const dataModale = new recentWorkModel({
            heading: heading,
            logo: logo_image,
            thumbnail: thumbnail_image,
            url: url,
        })

        const resData = await dataModale.save()
        if (!resData) {
            throw new Error("Recent Work Not saved")
        }
        logo.mv(logo_saveFile);
        thumbnail.mv(thumbnail_saveFile);
        res.status(200).json({
            status: true,
            message: "success",
            data: [
                logo_image,
                thumbnail_image
            ]
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error?.message
        })
    }
}
module.exports = work