const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/techkilla'
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000,
}).then(() => {
    console.log('connect')
})

// recent Work 
const recentWorkSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
})


const recentWorkModel = new mongoose.model('recent_work', recentWorkSchema)
// case-studie 

const caseStudieSchema = new mongoose.Schema({
    heading: {
        type: String,
    },

    main_heading: {
        type: String,
    },

    cover_page: {
        type: String,
    },

    slag: {
        type: String,
    },

    video_link: {
        type: String,
    },

    card_heading: {
        type: String,
    },

    cart_them: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },
    case_studie: [
        {
            thumbnail: String,
            heading: String,
            desc: String
        }
    ],
    use_case_oder: [String],

    use_case_image: [
        {
            icon: String,
            heading: String,
            desc: String
        }
    ],

    KeyHighlights: [
        {
            icon: String,
            heading: String
        }
    ],
    releted_project: [
        {
            thumbnail: String,
            heading: String,
            url: String,
        }
    ],
    benefits_heading: String,
    benefits: [
        {
            icon: String,
            heading: String,
            desc: String
        }
    ],
    status: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const caseStudieModel = new mongoose.model('case_studie', caseStudieSchema)
module.exports = { recentWorkModel, caseStudieModel }