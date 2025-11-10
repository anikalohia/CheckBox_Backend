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
        let label = req.body.label;
        let UserTask= await taskmodel.create({
            title:task,
            date: duedate,
            description: des,
            labelcolor: label,
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

export const deleteTask = async(req,res) =>{
    console.log("Got a deletion request")
   
    console.log(req.params.id)
    try{
        const deletedTask = await taskmodel.findByIdAndDelete(req.params.id);
        if(!deletedTask){
            res.status(404),json({success:false,message: "Unable to delete the task"})
        }
        res.status(200).json({success:true, message:"Task deleted successful"})
    }catch(e){
        res.status(500).json({success:false,message:"server error"})
        console.log(e)
    }
}
export const updateTask = async(req,res)=>{
    console.log("Got an updation request",req.body)
    try{
        const updatedTask = await taskmodel.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            description:req.body.description
        })
        console.log("update task",updateTask)
        if(!updateTask){
            res.status(404).json({message:"Task not found"})
        }
        res.status(200).json({message:"Task updated"})

    }catch(error){
        console.log(error)
        res.status(404).json({message:"server error"})
    }
}