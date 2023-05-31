const ex = require('express')
const app = ex.Router()

const work = require('../controller/work')
const readRecentWork = require('../controller/work/work')
const updateWork = require('../controller/work/udpate')
const deleteWork = require('../controller/work/delete')
const insertData = require('../controller/case-studie/insert')
const updateCaseStudie = require('../controller/case-studie/update')
const { case_studie_draf, case_studie_publish, all_case_studie } = require('../controller/case-studie/index')
const particular_case_studie = require('../controller/case-studie/particular_case_studie')
const deleteCaseStudie = require('../controller/case-studie/delete')
app.get('/', (req, res) => {
    res.send('admin')
})

app.post('/work', work)
app.get('/work', readRecentWork)
app.put('/work', updateWork)
app.delete('/work', deleteWork)

// case studie 
app.get('/case_studie_draf', case_studie_draf)
app.get('/particular_case_studie/:id', particular_case_studie)
app.post('/case_studie_publish', case_studie_publish)
app.get('/case_studie_publish', all_case_studie)
app.post('/case_studie', insertData)
app.put('/case_studie', updateCaseStudie)
app.post('/delete_case_studie', deleteCaseStudie)
module.exports = app