import mongoose, { now } from "mongoose"

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  emailVerified: { type: String, default: false },
  created_at: { type: Date, default: now() }
})

const userModel = mongoose.model("users", schema)
export default userModel
