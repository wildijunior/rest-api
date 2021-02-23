import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.HOST_DB}`;
const options =  {useNewUrlParser: true, useUnifiedTopology: true};

const conexao = mongoose.connect(uri, options)

export default conexao;