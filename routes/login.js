const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncWrapper = require('../utils/asyncWrapper.js');
const Blog = require('../models/blogSchema.js');
const ExpressError = require('../utils/expressErrorHandler.js');
const User = require('../models/userSchema.js');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const userSchemaValidation = require('../utils/userSchemaJoi.js');
const flash = require('connect-flash');


const userSchemaValidator = (req, res, next) => {
    const { error } = userSchemaValidation.validate(req.body, { allowUnknown: true } );
    if (error) {
        console.log(error);
        return next(new ExpressError(error.message, 500));
    } else {
        next();
    }
}


router.get("/signup", asyncWrapper(async (req, res, next) => {
    res.render('./partials/signup.ejs')
}));

// storing user data on the databases.

router.post("/register", userSchemaValidator, asyncWrapper(async (req, res, next) => {
    let { email, username, password } = req.body.user;

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    let newUser = await new User({
        email: email,
        username: username,
        password: hashedPassword
    });

   await  newUser.save();

   req.session.userId = newUser._id;
//    console.log(newUser);

    res.redirect("/")
}))

// log in roues

router.get("/login", asyncWrapper(async (req, res, next) => {
    res.render('./partials/login.ejs');
}));

router.put("/login", asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body.login;

  const searchUserData = await User.findOne({ email });

  if (!searchUserData) {
    req.flash('error', 'User not found!');
    return res.redirect('/user/login'); 
  }

  const isMatch = await bcrypt.compare(password, searchUserData.password);

  if (isMatch) {
    req.session.userId = searchUserData._id;
    req.flash('success', `Welcome back! You're logged in.`);
    return res.redirect('/');
  } else {
    req.flash('error', 'Password incorrect, please try again!');
    return res.redirect('/user/login'); 
  }

}));



router.get("/logout", (req, res , next)=>{
    req.session.destroy(()=>{
        res.redirect("/");
    });
    
});



module.exports = router;