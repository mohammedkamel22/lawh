const Student = require("../models/Student");
const Parent = require("../models/Parent");
const Subscription = require("../models/Subscription_StudyPlan");

const activateSubscription = async (req, res) => {
  try {
    
    const { studentEmail, parentId, pricePaid } = req.body;

    
    const student = await Student.findOne({ email: studentEmail });
    const parent = await Parent.findById(parentId);

    if (!student || !parent) {
      return res.status(404).json({ msg: "make sure the user mail is right" });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); 

    const newSubscription = await Subscription.create({
      studentId: student._id,
      status: "active",
      pricePaid: pricePaid || 0, 
      startDate: startDate,
      endDate: endDate
    });

    await Student.findByIdAndUpdate(student._id, { isActive: true });
    await Parent.findByIdAndUpdate(parent._id, { isActive: true });

    return res.status(200).json({
      msg: "subscription is active",
      subscription: newSubscription
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "error while make subscription" });
  }
};

module.exports = { activateSubscription };