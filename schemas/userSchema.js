import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{type:String, required:true, unique: true, trim:true, minlength:6},
    password:{type:String, required:true, unique: false, trim:true, minlength:8},
    role:{type:String, required:true, unique: false, trim:true}
},{
    timestamps:true
});
const User = mongoose.model('User', userSchema);

export default User;