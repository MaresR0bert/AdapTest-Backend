import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const testSchema = new Schema({
    roomCode: { type: String, required: true, unique: true },
    questionArray: { type: Array, required: true },
    teacher: { type: String, required: true }
}, {
    timestamps: true
});
const Test = mongoose.model('Test', testSchema);

export default Test;