import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({path:'secrets.env'});
const preventRelogin = (req, res, next) => {
  try {
    const token = req.cookies.isLoggedIn;
    if (!token) {
      return next();
    }
    
      jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return res.json({ status: false, message: err.message });
          return res.json({status:false, message:"Already logged in!"});
      });
    
  } catch (err) {
    console.error(err);
    res.json({ status: false, message: err.message });
  }
};

export { preventRelogin };
