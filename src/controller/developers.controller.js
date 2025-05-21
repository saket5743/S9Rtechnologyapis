import asyncHandler from "../utils/asyncHandler.js";
import Developers from "../models/developer.model.js";

// CREATE DEVELOPER
const createDeveloper = asyncHandler(async (req, res) => {
  const { name, email, yearOfExperience, title, developer, country } = req.body;
  const newDeveloper = await Developers.create(req.body);

  if (!newDeveloper) {
    res.status(400).json({ msg: "No developer created" }, 400);
  }

  res.status(201).json({data: newDeveloper, msg: "Developer Created Successfully", status:201});
});

// GET ALL DEVELOPERS
const getAllDevelopers = asyncHandler(async(req,res)=>{
    const developers = await Developers.find();
    
    if (!developers) {
    res.status(404).json({ msg: "No developers found" }, 404);
  }

  res.status(200).json({data:developers, msg:"Developers found successfully", status:200});
});

// GET A USER BY ID
const getUserById = asyncHandler(async(req,res)=>{
    const {id:developerid} = req.params;
    const developer = await Developers.findById({_id:developerid}, req.body);
    if(!developer){
        res.status(404).json({msg:"Developer not found", status:404});
    }
    res.status(200).json({data:developer, msg:"Developer found successfully", status:200})
});

// UPDATE USER BY ID
const updateUserById = asyncHandler(async(req,res)=>{
    const {id:developerid} = req.params;
    const developer = await Developers.findByIdAndUpdate({_id:developerid}, req.body, {
        new:true,
        runValidators:true,
        overwrite:true
    });
    if(!developer){
        res.status(404).json({msg:"Developer not found", status:404});
    }
    res.status(200).json({data:developer, msg:"Developer updated successfully", status:200})
});

// DELETE USER BY ID
const deleteUserById = asyncHandler(async(req,res)=>{
    const {id:developerid} = req.params;
    const developer = await Developers.findByIdAndDelete({_id:developerid}, req.body);
    if(!developer){
        res.status(404).json({msg:"Developer not found", status:404});
    }
    res.status(200).json({msg:"Developer deleted successfully", status:200})
});

export {createDeveloper, getAllDevelopers, getUserById, updateUserById, deleteUserById};