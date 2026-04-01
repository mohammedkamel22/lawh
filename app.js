require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app =  express();


app.use(cors());
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
const studyPlanRoutes=require("./routes/studyPlanRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

app.use("/auth",authRoutes);
app.use("/studyplan",studyPlanRoutes);
app.use("/subjects", subjectRoutes);
app.use("/subscriptions", subscriptionRoutes);


dbConnection();

app.listen(port,()=>{
    console.log(`server is running on port${port}`)
})


