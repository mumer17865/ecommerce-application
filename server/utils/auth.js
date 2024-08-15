const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1000m' });
};

const verifyToken1 = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken1,
};
