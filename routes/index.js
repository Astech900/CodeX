const express = require('express');
const router = express.Router({ mergeParams: true }); 
const asyncWrapper = require('../utils/asyncWrapper.js');
const Blog = require('../models/blogSchema.js');
const ExpressError = require('../utils/expressErrorHandler.js');

router.get('/', asyncWrapper ( async (req, res,next) => {
    let allBlogs = await Blog.find();
if(!allBlogs){
    return next(new ExpressError('Data Not found!', 500))
}
// console.log(allBlogs);
  res.render('home.ejs',{blog : allBlogs})
  
}));

router.get('/blog/:id', asyncWrapper( async (req,res,next) =>{
  let {id} = req.params;
    if(!req.session.userId){
      req.session.returnTo = req.originalUrl;
      return res.redirect('/user/login');
    }
    // console.log(req.session)
  let findSingleBlog = await Blog.findById(id);
  if(!findSingleBlog){
    return next(new ExpressError('Your Blog Not Found!', 500))
  }
  // console.log(findSingleBlog)
  res.render('show.ejs', {blogData : findSingleBlog})
}))


module.exports = router;
