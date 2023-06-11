const ex = require('express')
const app = ex.Router()
const multer = require('multer')
const upload = multer();
const work = require('../controller/work/insert');
const readRecentWork = require('../controller/work');
const readFile = require('../controller');

const updateWork = require('../controller/work/udpate')
const deleteWork = require('../controller/work/delete')
const insertData = require('../controller/case-studie/insert')
const updateCaseStudie = require('../controller/case-studie/update')
const { case_studie_draf, case_studie_publish, all_case_studie } = require('../controller/case-studie/index')
// const particular_case_studie = require('../controller/case-studie/particular_case_studie')
// const deleteCaseStudie = require('../controller/case-studie/delete')

app.get('/', (req, res) => {
    res.send('admin')
})

// read Image file 
app.get('/file/:filename', readFile)

app.get('/work', readRecentWork)
app.post('/work-insert', upload.fields([{ name: 'thumbnail' }, { name: 'logo' }]), work)
app.put('/work-edit', upload.fields([{ name: 'thumbnail' }, { name: 'logo' }]), updateWork)

app.delete('/work', deleteWork)

// case studie 
app.get('/case_studie_draf', case_studie_draf)
// app.get('/particular_case_studie/:id', particular_case_studie)
app.post('/case_studie_publish', case_studie_publish)
app.get('/case_studie_publish', all_case_studie)
app.post('/case_studie_insert', upload.single('cart_them'), insertData)
app.put('/case_studie_update', upload.fields([{ name: 'cover_page' }, { name: 'thumbnail' }, { name: 'icon' }]), updateCaseStudie)
// app.post('/delete_case_studie', deleteCaseStudie)
module.exports = app