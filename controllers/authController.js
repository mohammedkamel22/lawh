const Student = require("../models/Student");

const {registerSchema,loginSchema}= require("./validation/authValidation");

const register = async (req,res )=>{
   
    try{
const {error,value}= registerSchema.valdiate(req.body,{
    abortEarly:false,
    stripUnknown:true, 
})
    }
   catch (error){

}

}


const login = async (req,res )=>{
   
    try{

    const {error,value}= loginSchema.valdiate(req.body,{
    abortEarly:false,
    stripUnknown:true, 
})



    }
   catch (error){

}

}



const logout = async (req,res )=>{
   
    try{

    }
   catch (error){

}

}


module.exports={
    register,
    login,
    logout,
}