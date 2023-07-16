import mongoose, { now } from "mongoose"

const schema = mongoose.Schema({
  user_id: String,
  title: String,
  content: String,
  created_at: { type: Date, default: now() }
})

const noteModel = mongoose.model("notes", schema)
export default noteModel
