const express = require('express');
const router = require('./router/')
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(router)
// app.get('/file/:filename', (req, res) => {
//     const storage = mega({ email, password, autoload: true });
//     const filename = req.params.filename;

//     storage.on('ready', () => {
//         const files = storage.root.children;
//         let fileFound = false;
//         for (const file of files) {
//             console.log(file.name)
//             if (file.name === filename) {
//                 const downloadStream = file.download();
//                 downloadStream.pipe(res);
//                 fileFound = true;
//                 break;
//             }
//         }

//         if (!fileFound) {
//             res.status(404).send('File not found');
//         }
//     });
// });

app.listen(2917, () => {
    console.log('http://localhost:2917');
});
