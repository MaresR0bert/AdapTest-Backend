import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const tempLogSchema = new Schema({
    username:{type:String, required:true, unique:true},
    roomCode:{type:String, required:true},
    questionArrayRemaining:{type:Array, required:false},
    questionArrayDone:{type:Array, required:false},
    givenAnswers:{type:Array, required:false},
    score:{type:Number, required:false},
    teacher:{type:String, required:true}
},{
    timestamps:true
});
const TempLog = mongoose.model('TempLog', tempLogSchema);

export default TempLog;