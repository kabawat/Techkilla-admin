const mega = require('megajs');

const readFile = async (req, res) => {
    const { MEGA_AUTH_EMAIL, MEGA_AUTH_PASSWORD } = process.env
    console.log(MEGA_AUTH_EMAIL, MEGA_AUTH_PASSWORD)
    const storage = mega({ email: MEGA_AUTH_EMAIL, password: MEGA_AUTH_PASSWORD, autoload: true });
    const filename = req.params.filename;

    storage.on('ready', () => {
        const files = storage.root.children;
        let fileFound = false;
        for (const file of files) {
            console.log(file.name)
            if (file.name === filename) {
                const downloadStream = file.download();
                downloadStream.pipe(res);
                fileFound = true;
                break;
            }
        }

        if (!fileFound) {
            res.status(404).send('File not found');
        }
    });

}
module.exports = readFile