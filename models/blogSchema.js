const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    content: {
        type: String,
        required: true  
    },
    image: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQM3whBo8G2guMjcH-gzAipNvJbpnPZltZg&s",
        set: (v) => v === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQM3whBo8G2guMjcH-gzAipNvJbpnPZltZg&s" : v
    },
    createdAt: {
        type: Date,
        default: Date.now  // <--- NO parentheses here
    },
    author: {
        type: String,
        required: true
    },
    userData : {
        type: Schema.Types.ObjectId,
        ref : "User"
    }
});

const Blog = mongoose.model("Blog",blogSchema);


module.exports = Blog;


