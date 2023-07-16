import bcrypt from "bcrypt"
import jwt_decode from "jwt-decode"

export const harshPassword = async (password) => await bcrypt.hash(password.toString(), 12)

export const decryptPassword = async (password, harsh) => await bcrypt.compare(password.toString(), harsh)

export const validator = (email) => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  if (!email) return false
  if (email.length > 254) return false
  return emailRegexp.test(email)
}

export const decodeToken = (reqs) => {
  let token = reqs.headers.authorization
  if (!token) return false
  token = token.split(" ")[1]
  return jwt_decode(token)
}
