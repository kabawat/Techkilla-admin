function convertToSlug(string) {
    var charactersToRemove = /[/!@#$%^&*()?,\s]/g;
    return string.replace(charactersToRemove, "-");
}
function MegaStorage(file_data, storage) {
    const name = `${new Date().getTime()}-` + convertToSlug(file_data.originalname)
    storage.on('ready', () => {
        const uploadOptions = {
            name,
            target: storage.root,
            attributes: { type: 'file' },
            size: file_data.size // Add the file size to the uploadOptions
        };

        const readStream = require('stream').Readable.from(file_data.buffer);
        const writeStream = storage.upload(uploadOptions, readStream);

        writeStream.on('finish', () => {
            console.log('File uploaded successfully')
        });

        writeStream.on('error', (error) => {
            console.log(error);
        });
    });
    return name
}
module.exports = { MegaStorage, convertToSlug }