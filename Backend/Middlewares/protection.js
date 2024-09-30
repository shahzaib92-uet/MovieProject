const jwt = require('jsonwebtoken');
const User = require('../Middlewares/protection');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const protect = async(req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    console.log('Decoded User:', user); // Log the user object

    req.user = user; // Attach the decoded user object to req.user
    next();
  });
};
module.exports = protect;
