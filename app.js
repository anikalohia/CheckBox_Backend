import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import taskmodel from './models/task.js';
import cors from 'cors';
import userRouter from './routes/userroute.js'  
import authRouter from './routes/authroute.js'
import dotenv from "dotenv";
import taskRouter from './routes/taskroute.js';
dotenv.config();

// connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));


const app = express();
app.use(cors({ origin: 'http://localhost:5173',
    credentials: true  
 }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/task',taskRouter)
app.get('/homepage',async (req,res)=>{
    let taskmanager=await taskmodel.find({});
    res.render('homepage',{taskmanager});
})
app.post('/addtask',async (req,res)=>{

    let task=req.body.task;
    let user= "Anika";
    let UserTask= await taskmodel.create({
        title:task,
        status:"pending",
        user:"Anika"

    })
    console.log(UserTask);
    res.redirect('/homepage');
})
app.post('/edit',async (req,res)=>{
    let id = req.query.index;
    var task = await taskmodel.findById(id);
      
    res.render('edit',{task});

})
app.post('/edittask',async(req,res)=>{
    var id = req.query.index;
   
    // var oldtitle = task.title;
    var newtask = req.body.updatedtask;
     console.log(newtask);

    await taskmodel.findByIdAndUpdate(id,{title:newtask});
    let updatedtask = await taskmodel.findById(id);
    console.log(updatedtask)
   
    
    res.redirect('/homepage');
    
    
})
app.post('/delete',async(req,res)=>{
    var id = req.query.index;
    await taskmodel.findByIdAndDelete(id);
    res.redirect('/homepage');
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})