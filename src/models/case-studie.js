import mongoose from "mongoose";
const caseStudie = new mongoose.Schema({
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
mongoose.models = {}
export default mongoose.model('tkadmin', caseStudie)