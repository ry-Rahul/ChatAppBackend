import mongoose from "mongoose";
import {hash} from "bcrypt"

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
},{
    timestamps: true,
    
});

userSchema.pre("save",async function(next){
  // if password is not modified then don't hash it again and again 
  if(!this.isModified("password")){
    next();
  }
  this.password= await hash(this.password,10);
})

const User = mongoose.model("User", userSchema);
export  {User};
