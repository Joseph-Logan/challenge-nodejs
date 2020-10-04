const jwt = require('jsonwebtoken')

module.exports = requireAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization') 
    if (!token) return res.status(403).send('Forbidden')

    jwt.verify(token, process.env.SECRET_KEY);
    next()
  } catch (err) {
    return res.status(400).send('Invalid token')
  }
}