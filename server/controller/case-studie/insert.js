const path = require('path')
const { caseStudieModel } = require('../')
function convertToSlug(string) {
    // Remove symbols and convert to lowercase
    var slug = string.replace(/[^\w\s]+/g, '').toLowerCase();

    // Replace spaces with hyphens
    slug = slug.replace(/\s+/g, '-');

    return slug;
}
async function insertData(req, res) {
    try {
        const { main_heading, desc, video_link } = req.body
        const { cart_them } = req.files
        const rootDir = path.dirname(require.main.filename);

        const cart_them_file_name = convertToSlug(main_heading)
        const cart_them_filename = `${cart_them_file_name}-cart_them-${new Date().getTime()}${path.extname(cart_them.name)}`
        const cart_them_saveFile = path.join(rootDir, `public/case-studie/${cart_them_filename}`);
        const cart_them_image = `/case-studie/${cart_them_filename}`;

        const dataModale = new caseStudieModel({
            main_heading,
            desc,
            cart_them: cart_them_image,
            video_link: video_link ? video_link : ''
        })

        const isSave = await dataModale.save()
        if (!isSave) {
            throw new Error("try again")
        }
        cart_them.mv(cart_them_saveFile)
        res.status(200).json({
            status: true,
            message: 'data store',
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error?.message,
        })
    }
}
module.exports = insertData