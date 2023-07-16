import mongoose from "mongoose"
import { decodeToken } from "../config/utils.js"
import noteModel from "../schemas/notes.schema.js"
export const saveNote = async (req, res) => {
  const token = decodeToken(req)
  if (!token.id) return res.status(405).json({ "status": "fail", "message": "unauthenticated" })
  try {
    const sendData = await noteModel.create({
      "title": req.body.title,
      "content": req.body.content,
      "user_id": token.id
    })
    return res.status(200).json({ data: sendData, message: "success" })
  } catch (err) {
    console.log(err)
  }
}

export const updateNote = async (req, res) => {
  const token = decodeToken(req)
  try {
    const note = await noteModel.updateOne({ _id: req.params.id, user_id: token.id }, req.body, { new: true })
    if (!note) return res.status(405).json({ "status": "fail", "message": "unable toupdate" })
    return res.status(200).json({ status: "success", message: "update successful" })
  } catch (error) {
    console.log(error)
  }
}

export const deleteNote = async (req, res) => {
  const token = decodeToken(req)
  try {
    const allUsers = await noteModel.deleteOne({ user_id: token.id, _id: req.params.id })
    return res.status(204).json({ "status": "success", message: "note deleted" })
  } catch (error) {
    console.log(error)
  }
}

export const getNote = async (req, res) => {
  const token = decodeToken(req)
  try {
    const notes = await noteModel.find({ user_id: token.id })
    return res.status(200).json({ data: notes, message: "success" })
  } catch (error) {
    console.log(error)
  }
}
