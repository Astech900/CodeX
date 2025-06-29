const mongoose = require('mongoose');
const Blog = require('../models/blogSchema.js');
const round1Blogs = require('./data.js');
const mongo_url = 'mongodb://127.0.0.1:27017/Blogger';






main()
.then(result => console.log('Your Database Has connected'))
.catch(err => console.log('Database Error Occured'))

async function main(params) {
    await mongoose.connect(mongo_url);
}


const initialDbs = async () =>{
   
   let result =  await Blog.insertMany(round1Blogs);
   console.log(result);
   console.log('Data Is Successfully Initialized');
    

}
initialDbs();