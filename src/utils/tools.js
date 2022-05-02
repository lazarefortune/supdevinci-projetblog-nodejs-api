import { roles } from "../config/roles.js"

export const getRandomRole = () => {
  const Allroles = roles.map((role) => role.name)

  const randomIndex = Math.floor(Math.random() * Allroles.length)
  return Allroles[randomIndex]
}

export const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const securityHelper = {
  // eslint-disable-next-line no-useless-escape
  emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  passwordLengthMin: 3,
  passwordRegex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,}$/,
  passwordError: "Password must be at least 3 characters and must contain at least one lowercase letter, one uppercase letter, one number and one special character",
}


export const checkRequiredFields = (object, requiredFields) => {
  const missingFields = []
  requiredFields.forEach((field) => {
    if (!object[field]) {
      missingFields.push(field)
    }
  })
  return missingFields
}