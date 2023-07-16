import token from "../config/token.js"
import { decryptPassword, harshPassword, validator } from "../config/utils.js"
import userModel from "../schemas/users.schema.js"

export const signup = async (req, res) => {
  try {
    req.body["created_at"] = new Date()
    const findUser = await userModel.findOne({ email: req.body.email })
    if (!req.body.password) return res.status(405).json({ "status": "fail", "message": "password is compulsory" })
    if (!req.body.firstName) return res.status(405).json({ "status": "fail", "message": "first name is compulsory" })
    if (!req.body.lastName) return res.status(405).json({ "status": "fail", "message": "last name is compulsory" })
    if (!req.body.email) return res.status(405).json({ "status": "fail", "message": "email is compulsory" })

    if (findUser)
      return res.status(409).json({
        status: "fail",
        message: "user already exist"
      })

    if (!validator(req.body.email)) return res.status(405).json({ "status": "fail", "message": "invalid email format" })
    const password = await harshPassword(req.body.password)
    const { email, firstName, lastName } = req.body
    const sendData = await userModel.create({ email: email, password: password, firstName: firstName, lastName: lastName })
    return res.status(200).json({ data: sendData._id, message: "success" })
  } catch (err) {
    console.log(err)
  }
}

// export const updateUser = async (req, res) => {
//   try {
//     const updateUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     return res.status(200).json({ data: updateUser, message: "success" })
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getUsers = async (req, res) => {
//   try {
//     const allUsers = await userModel.find()
//     return res.status(200).json({ data: allUsers, message: "success" })
//   } catch (error) {
//     console.log(error)
//   }
// }

export const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) return res.status(404).json({ "status": "fail", "message": "username or password not found" })
    const checkPassword = await decryptPassword(req.body.password, user.password)
    if (!checkPassword) return res.status(405).json({ "status": "fail", "message": "username or password not found" })
    const tokenize = token.accessToken({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName
    })
    return res.status(200).json({ token: tokenize })
  } catch (error) {
    console.log(error)
  }
}
