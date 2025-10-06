export const createTask = async (req,res)=>{
    let task=req.body.task;
    let UserTask= await taskmodel.create({
            title:task,
            status:"pending",
            user:"Anika"
    
        })
    console.log(UserTask);
    res.status(201).json({success:true,message:"Task created successfully",task:UserTask});
}