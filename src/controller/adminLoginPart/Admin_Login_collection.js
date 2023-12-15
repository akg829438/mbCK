const { JWT_SECRET_KEY } = require("../../constent/Constent");
const AdminLoginModel = require("../../model/adminLoginPart/Admin_Login_modal")
const { isValidPassword } = require("../../utils/Utils")
const twt = require("jsonwebtoken")
// const {JWT_SECRET_KEY} = require("../constent/Constent")





exports.adminSignup = async (req, res) => {

  const data = req.body
  console.log(data);
  const data_come = {
    admin_email: data.admin_email,
    admin_password: data.admin_password,
  }
  try {
    const ress = await AdminLoginModel.create(data_come)
    if (ress) {
      res.json({
        status: "success",
        message: "signup sucessfully",
        data: ress,

      })
    }
    else {
      res.json({
        status: "fail",
      })
    }
  } catch (error) {
    const resError = {}
    resError.status = "failed"
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }
    res.json(resError)
  }

}


exports.adminLogin = async (req, res) => {
  try {
    const data = req.body
   


    const query = { admin_email: data.admin_email }
    const ress = await AdminLoginModel.findOne(query, { admin_password: 1, _id: 0 })
    

    if (isValidPassword(data.admin_password, ress.admin_password)) 

      

      if (ress) {
        const bindData = {
          userId: "876687687678876",
          phoneNumber: "89879879897"
        }
        const token = twt.sign(bindData, JWT_SECRET_KEY, { expiresIn: '30d' })
        res.json({
          status: "sucess",
          message: "login sucessfully",
          token:token
        })
      } else {
        res.json({
          status: "fail",
          message: "enter correct password",
        })
      }
    


  } catch (error) {
    const resError = {}
    resError.status = "failed"
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }
    res.json(resError)
  }
}



