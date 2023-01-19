require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken =  async(token) => {
    const user =  await jwt.verify(
         token,
         SECRET_KEY,
         (err, decoded) => {
             if (err) return  Promise.reject(err);
             if (err) return  Promise.resolve(decoded);
            }
    );
    return user;
}

module.exports = verifyToken;
