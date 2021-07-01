import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const questionSchema = new Schema({
    questionBody:{type:String, required:true},
    rightAnswers:{type:Array, required:true},
    wrongAnswers:{type:Array, required:true},
    difficulty:{type:Number, required:true},
    username:{type:String, required:true},
    questionCode:{type:String, required:false},
    questionProgLang:{type:String, required:false},
    questionCategory:{type:String, required:false}
},{
    timestamps:true
});
const Question = mongoose.model('Question', questionSchema);

export default Question;