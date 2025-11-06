import taskmodel from "../models/task.js";

export const createTask = async (req,res)=>{
    console.log("Got the request")
    console.log(req.body)
    let {title} = req.body;
    if(!title){
        res.json({
            success:false,
            message: "Title is required"
        })
    }
    try{
        let task=req.body.title;
        let duedate = req.body.date;
        let des = req.body.description;
        let UserTask= await taskmodel.create({
            title:task,
            date: duedate,
            description: des,
            labelcolor: "fuschia",
            status:"pending",
            user:"Anika"
    
        })
        res.status(201).json({success:true,message:"Task created successfully",task:UserTask});

    }catch(error){
        console.log(error);

    }

    
}

export const getTask = async(req,res) =>{
    try{
        let tasks = await taskmodel.find({});
        res.status(200).json({success:true, tasks: tasks});
       
    }catch(error){
        console.log(error);
    }
}