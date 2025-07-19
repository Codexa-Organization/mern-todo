import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Bearer token se extract

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify
    req.user = decoded.id;  // User ID req pe attach – controllers mein use karo
    next();  // Agla middleware/route
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default protect;