const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncWrapper = require('../utils/asyncWrapper.js');
const Blog = require('../models/blogSchema.js');
const ExpressError = require('../utils/expressErrorHandler.js');
const User = require('../models/userSchema.js');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const flash = require('connect-flash');
const blogSchemaValidation = require('../utils/blgoSchemaJoi.js');
const { route } = require('./index.js');


const blogSchemaValidator = (req,res,next)=>{
    const {error} = blogSchemaValidation.validate();

    if(error){

        // req.flash('error', 'Validation Error');
        return next(new ExpressError('validation error Dbs', 405))
        
    }else{
        next();
    }
}


router.get('/new/:id', (req,res,next)=>{

    if(!req.session.userId){
        req.flash('error', 'Please log in first');
       return res.redirect('/');
    }
     res.render('./partials/blogForm.ejs');
})


router.post("/new/:id/create", blogSchemaValidator, asyncWrapper(async(req,res,next)=>{
    let {id} = req.params;
    let {title , content, url} = req.body.blog;

    let findOwnerUser = await User.findById(id);
    if(!findOwnerUser){
      req.flash('error', 'User not Exists Anymore..');
     return  res.redirect('/');
    }

    let newBlog = new Blog({
        title : title,
        content : content,
        image : url,
        author : findOwnerUser.username,
        userData : id
    });
    // console.log(newBlog)

    await newBlog.save()
    req.flash('success', 'You Blog Has Successfully Posted!');
    res.redirect("/");
}));


router.get("/:id/edit",asyncWrapper(async(req,res,next)=>{
    if(!req.session.userId){
        req.flash('error', 'Please log in first!');
       return res.redirect('/');
    }
    let {id} = req.params;

    let findEditDocs = await Blog.findById(id);
    if(!findEditDocs){
        req.flash('error', 'data not found!');
        return next(new ExpressError('edit Data not found', 403));
    }
    // console.log(findEditDocs)




    res.render('./partials/edit.ejs', {blogsEdit : findEditDocs} );
}));


router.post("/:id/edited", blogSchemaValidator, asyncWrapper(async(req,res,next)=>{
    let {id} = req.params;
    let {title, content, url} = req.body.edited;
    let updatedData = await Blog.findByIdAndUpdate(id, {...req.body.edited});
    req.flash('success', 'Your data Has Successfully Edited');
    res.redirect(`/blog/${id}`);
}));

router.get("/:id/delete", asyncWrapper(async(req,res,next)=>{
    let {id} = req.params;

    let findDeletePost = await Blog.findByIdAndDelete(id)
    // console.log(findDeletePost)
    req.flash('success','your data successfully Deleted')
    res.redirect("/");
}))




module.exports = router;