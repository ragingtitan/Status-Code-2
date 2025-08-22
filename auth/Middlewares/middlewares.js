import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./secrets.env" });

const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.isLoggedIn;
    if (!token) {
      return res.json({
        status: false,
        message: "Please login and try again!",
      });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      req.userId = decodedToken.id;
      next();
    } catch (err) {
      return res.json({ status: false, message: "Invalid or expired token!" });
    }
  } catch (err) {
    console.error(err);
    res.json({ status: false, message: err.message });
  }
};

export { authenticateUser };