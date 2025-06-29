# CodeX

# 📝 Blogger - A Simple Blog Website

A full-stack blog web application built using **Express.js**, **MongoDB**, and **EJS**, where users can sign up, log in, post blogs, edit, and delete them. CSRF protection, session handling, form validation, and flash messages are implemented for better security and UX.

---

## 🚀 Features

- User Registration and Login (session-based auth)
- Post a new blog with title, content, and image
- Edit or delete your own blog
- Flash messages for feedback
- CSRF protection on all forms
- Server-side validation using Joi
- Custom 404 and error handler pages

---

## 🧰 Tech Stack

- **Backend**: Express.js, Node.js
- **Database**: MongoDB + Mongoose
- **Templating Engine**: EJS + EJS-Mate
- **Validation**: Joi
- **Security**: CSRF, cookie-parser, express-session
- **Flash Messaging**: connect-flash
- **Password Encryption**: bcrypt

---

## 📁 Folder Structure

📦project-root
┣ 📂models
┃ ┣ 📄blogSchema.js
┃ ┗ 📄userSchema.js
┣ 📂routes
┃ ┣ 📄index.js
┃ ┣ 📄login.js
┃ ┗ 📄blog.js
┣ 📂utils
┃ ┣ 📄asyncWrapper.js
┃ ┣ 📄expressErrorHandler.js
┃ ┣ 📄blgoSchemaJoi.js
┃ ┗ 📄userSchemaJoi.js
┣ 📂public
┃ ┗ 📄(CSS/JS/static assets)
┣ 📂views
┃ ┣ 📂partials
┃ ┃ ┣ 📄blogForm.ejs
┃ ┃ ┣ 📄edit.ejs
┃ ┃ ┣ 📄login.ejs
┃ ┃ ┗ 📄signup.ejs
┃ ┣ 📂errors
┃ ┃ ┣ 📄error404.ejs
┃ ┃ ┗ 📄alertError.ejs
┃ ┣ 📄home.ejs
┃ ┗ 📄show.ejs
┣ 📄app.js
┗ 📄package.json


==> Main Routes
Route	Method	Description
/	GET	Home page with all blogs
/blog/:id	GET	Show a single blog
/user/signup	GET	Registration form
/user/register	POST	Register new user
/user/login	GET	Login form
/user/login	PUT	Login logic
/user/logout	GET	Logout current user
/blogs/new/:id	GET	Form to create blog
/blogs/new/:id/create	POST	Create a new blog post
/blogs/:id/edit	GET	Edit form for a blog
/blogs/:id/edited	POST	Update blog post
/blogs/:id/delete	GET	Delete blog post



✅ Server Side Validation.
Joi used to validate:

Blog post (title, content, image)

User signup (email, username, password)


⚠️ Custom Error Handling
404 Not Found route: views/errors/error404.ejs

Custom ExpressError class

Flash messages for common issues (like login failure)


👨‍💻 Author
Salauddin Khan Apon
Full-Stack Developer
MERN Stack Lover from Barishal, Bangladesh 🇧🇩
