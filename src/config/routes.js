import { deleteNote, getNote, saveNote, updateNote } from "../controller/note.controller.js"
import { login, signup } from "../controller/users.controller.js"
import token from "./token.js"

const router = (app) => {
  app.post("/sign-up", signup)
  app.post("/login", login)
  app.post("/note", token.authenticate, saveNote)
  app.put("/note/:id", token.authenticate, updateNote)
  app.get("/note", token.authenticate, getNote)
  app.delete("/note/:id", token.authenticate, deleteNote)
}

export default router
