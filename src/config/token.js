import jwt from "jsonwebtoken"

const accessToken = (user) => jwt.sign(user, "token", { expiresIn: 60 * 60 * 24 })

const authenticate = (req, res, next) => {
  const auth = req.headers["authorization"]
  const token = auth ? auth.split(" ")[1] : ""
  if (!token)
    return res.status(401).json({
      "message": "unauthorized"
    })
  jwt.verify(token, "token", (err, user) => {
    if (err) {
      return res.status(403).json({
        "message": err.message
      })
    } else {
      req.user = user
      next()
    }
  })
}

const token = { accessToken, authenticate }
export default token
