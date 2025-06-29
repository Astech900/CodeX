const express = require('express');
const app = express();
const port = 5001;

const mainRoutes = require('./routes/index.js');
const loginRoute = require('./routes/login.js');
const newBlgoRoute = require('./routes/blog.js')

const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const session = require('express-session');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');


const mongo_url = 'mongodb://127.0.0.1:27017/Blogger';
var methodOverride = require('method-override')
const flash = require('connect-flash');

// 👉 Middleware — put all of these BEFORE routes
app.use(express.static(path.join(__dirname, "./public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());




app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride('_method'));
const sessionOption = {
  secret: 'mysupersecretcode',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
  }
};

app.use(session(sessionOption));

app.use(csrf({ cookie: true }));
app.use((req,res,next)=>{

    res.locals.currentUser = req.session.userId || null;
    res.locals.csrfToken = req.csrfToken();
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



//  Now mount routes AFTER middleware
app.use('/', mainRoutes);
app.use('/user', loginRoute);
app.use('/blogs', newBlgoRoute);






//  DB connection
main()
    .then(() => console.log('Your Database Has connected'))
    .catch(err => console.log('Database Error Occured'));

async function main() {
    await mongoose.connect(mongo_url);
}

// 404 handler
app.all(/.*/, (req, res, next) => {
    res.status(404).render('./errors/error404.ejs');
});

// Error middleware
app.use((err, req, res, next) => {
    console.log(err.message);
    console.log(err)
    const { message = 'Something went wrong!', statusCode = 500 } = err;
    res.status(statusCode).render('./errors/alertError.ejs', { message, statusCode });
});

app.listen(port, () => {
    console.log(`Server Runned on port ${port}`);
});
