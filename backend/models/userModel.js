import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    name: { type:String, required: true},
    email: { type:String, required: true, unique: true},
    password: { type:String, required: true},
    cartData: { type:Object, default:{}}
}, {minimize: false})

// using OR operator to avoid multiple models running
const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;