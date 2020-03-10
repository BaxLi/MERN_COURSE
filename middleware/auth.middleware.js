const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
// console.log("server auth middleware started")
  if (req.method === 'OPTIONS') {
    return next() // check if server is available
  }
  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    // console.log("token=", token);
    
    if (!token) {
      return res.status(401).json({ message: 'please authorise' })
    }

    const decoded = jwt.verify(token, config.get('jwtsecret'))
    console.log("user=", decoded);

    req.user = decoded
    next()
    
  } catch (error) {
    console.log("Authorisation trioubles");
    return res.status(401).json({ message: 'please authorise' })
  }
}
