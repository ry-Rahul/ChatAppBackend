import mongoose, { Schema, model, Types } from "mongoose";

const chatSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  groupChat: {
    type: String,
    default:false
  },
  creator: {
    type: Types.ObjectId,
    ref: "User",
  },
  members:[
    {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
  ]
 
},{
    timestamps: true,
    
});

const Chat = mongoose.model("Chat", chatSchema);
export  {Chat};
