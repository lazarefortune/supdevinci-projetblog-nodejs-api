import "dotenv/config"

const env = process.env

export default {
  password: {
    pepper: env.SECURITY_PASSWORD_PEPPER,
    iteration: 10000,
    keylen: 512,
    digest: "sha512",
  },
  session: {
    secret: env.SECURITY_SESSION_SECRET,
    expireAfter: "3 days",
  },
}
