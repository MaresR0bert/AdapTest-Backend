import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const testLogSchema = new Schema({
    student: { type: String, required: true },
    roomCode: { type: String, required: true },
    questionArray: { type: Array, required: true },
    givenAnswers: { type: Array, required: true },
    score: { type: Number, required: true },
    teacher: { type: String, required: true }
}, {
    timestamps: true
});
const TestLog = mongoose.model('TestLog', testLogSchema);

export default TestLog;