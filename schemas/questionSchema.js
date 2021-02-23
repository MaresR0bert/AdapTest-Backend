import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const questionSchema = new Schema({
    body:{type:String, required:true},
    answer:{type:String, required:true},
    fakes:{type:String, required:true},
    difficulty:{type:Number, required:true},
    username:{type:String, required:true}
});
const Question = mongoose.model('Question', questionSchema);

export default Question;