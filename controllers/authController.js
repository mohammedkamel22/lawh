const Student = require("../models/Student");
const Parent = require("../models/Parent");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { studentRegisterSchema, parentRegisterSchema, loginSchema} = require("../controllers/validation/authValidation"); 


const registerStudent = async (req, res) => {
  try {
    const { error, value } = studentRegisterSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        msg:error.message
      });
    }

  
    const { username, password, email, grade, department } = value; 

    const existStudent = await Student.findOne({ email });
    const existParent = await Parent.findOne({ email });

    if (existStudent || existParent) {
      return res.status(400).json({ msg: "this mail alrady used" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
   

    
    const createStudent = await Student.create({
      username,
      email,
      password: hashPassword,
      grade: grade || "الثالث الإعدادي", 
      department: department || "عام",
    });

    return res.status(201).json({ 
      msg: "student account created", 
      student: { _id: createStudent._id, username, email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "error in server" });
  }
};


const registerParent = async (req, res) => {
 try {
    const { error, value } = parentRegisterSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({ msg: error.message });
    }

   
    const { username, password, email, studentEmail } = value;

   
    const existStudent = await Student.findOne({ email });
    const existParent = await Parent.findOne({ email });

    if (existStudent || existParent) {
      return res.status(400).json({ msg: "this mail alrady used" });
    }

   
    const student = await Student.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).json({ msg: "student email not found" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

  
    const createParent = await Parent.create({
      username,
      email,
      password: hashPassword,
      linkedChildId: student._id
    });

    student.linkedParentId = createParent._id;
    await student.save();

    return res.status(201).json({ 
      msg: "parent acount created and connect with his child",
      parent: { _id: createParent._id, username, email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "error in serever" });
  }
};


const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, 
    });

    if (error) {
      return res.status(400).json({
        msg: error.details.map((err) => err.message),
      });
    }

    const { email, password } = value;

  
    let user = await Student.findOne({ email });
    let role = "student";

    
    if (!user) {
      user = await Parent.findOne({ email });
      role = "parent";
    }

   
    if (!user) {
      return res.status(400).json({ msg: "accout not found" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ msg: "password not correct" });
    }

   
    const token = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SK , 
      { expiresIn: "1d" }
    );

    res.status(200).json({ 
      msg: "login done", 
      token,
      role, 
      username: user.username,
      id: user._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg:"error in serever" });
  }
};

const logout = (req, res) => {
 
  res.status(200).json({ msg: "logout done" });
};

module.exports = {
  registerStudent,
  registerParent,
  login,
  logout,
};