const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    email : {
        type : String,
        required : true,
         unique: true,
          trim: true,
          minlength: 5,
           maxlength: 320,     
    },
    username : {
          type: String,
           required: true,
           unique: true,
           trim: true,
           minlength: 3,
          maxlength: 30,
        
    },
    password : {
        type: String,
        required: true,
         minlength: 6
    }
});


module.exports = new mongoose.model('User', userSchema);
