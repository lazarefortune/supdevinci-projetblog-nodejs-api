import { pbkdf2Sync, randomBytes } from "crypto";
import config from "../../../config.js";

const { keylen, pepper, iteration, digest } = config.security.password;

const hashPassword = (password, salt = randomBytes(128).toString("hex")) => [
  pbkdf2Sync(password, salt + pepper, iteration, keylen, digest).toString(
    "hex"
  ),
  salt,
];

export default hashPassword;
