import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'default_secret';
const EXPIRY = process.env.JWT_EXPIRY || '1h';

export const createJWT = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRY });
};

export const verifyJWT = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};
