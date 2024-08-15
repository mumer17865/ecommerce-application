const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
