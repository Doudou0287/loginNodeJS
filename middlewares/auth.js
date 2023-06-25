import jwt from "jsonwebtoken";
import User from "../Models/User";

export const authenticateUser = async (req, res, next) => {
  const token = req.session.token;
  try {
    const userToken = jwt.verify(token, process.env.SESSION_SECRET);
    // Retrieve the user information from the database using the token data
    const user = await User.findById(userToken.userId).exec();
    console.log("user ", user)
    if (!user) {
      console.log("Authentication failed");
      res.redirect("/");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};


export const existUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("user exists");
      res.redirect("/login");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
