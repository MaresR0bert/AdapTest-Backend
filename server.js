import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import questionRouter from './routes/questionRoute.js';
const uriString = "mongodb+srv://SJUs0tV8tEBrpUEE:N6UpA9YEt9JTtQTb@atplaform.k0xbt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(uriString,{useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true});
const conn = mongoose.connection;
conn.once('open', function(){
    console.log("MongoDB connected successfully");
});

app.use('/user', userRouter);
app.use('/question', questionRouter)

const port = process.env.PORT || 3001;
app.listen(port,function(){
    console.log('Server running on port: '+port);
});