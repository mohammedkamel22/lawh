require('dotenv').config();
const express = require("express");

const app =  express();

app.use(express.json());

const port = process.env.PORT ||7000;

 const mongoose=require("mongoose");

async function dbConnection() {
try{
   
 await  mongoose.connect(process.env.DB_URL)
    console.log('Connected!');
} catch(error)
{
    console.log(error)
};
}

const authRoutes = require("./routes/authRoutes");

app.use("/auth",authRoutes);



dbConnection();

app.listen(port,()=>{
    console.log(`server is running on port${port}`)
})