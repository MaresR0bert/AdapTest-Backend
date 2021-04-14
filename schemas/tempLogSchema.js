import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const tempLogSchema = new Schema({
    username:{type:String, required:true},
    questionArray:{type:Array, required:false},
    answers:{type:Array, required:false},
    score:{type:Number, required:false},
},{
    timestamps:true
});
const TempLog = mongoose.model('TempLog', tempLogSchema);

export default TempLog;