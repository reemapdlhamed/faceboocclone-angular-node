const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    min:3,
    max: 20,
  },

  email: {
    type: String,
    unique: true,
    max:50,
    required: true,
    trim: true,
    
  },

  password: {
    type: String,
    required: true,
    min:6
  },
  profilePicture:{
    type:String,
    default:"",
  },
  coverPicture:{
    type:String,
    default:"",
  },
  followings:{
    type:Array,
    default:[]
  },
  isAdmin:{
    type:Boolean,
    default : false
  },
  desc:{
    type:String,
    max:50
  },
  city:{
    type:String,
    max:50
  },
  from:{
    type:String,
    max:50
  },
  relationship:{
    type: String,
    enum: ['single', 'married','divorced'],
    default: 'single'
  }
 

},
{timestamps:true}
);
module.exports = mongoose.model("User", userSchema);
