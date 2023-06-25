import User from "../Models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const index = (req, res) => {
  res.render('home/index', { posts: [] });
};

export const login = (req, res) => {
  const { error } = req.query; // Get the error parameter from the query string
  res.render('home/login', { error }); // Pass the error variable to the login view
};
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  try {

      // Create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ firstName, lastName, email, password:hashedPassword });
      await newUser.save();
      console.log("data inserted to bdd")
      const token = jwt.sign({ userId: newUser._id }, process.env.SESSION_SECRET);
      console.log("data saved in token")
      // Store the user ID in the session
      req.session.userId = newUser._id;
      req.session.token = token;
      console.log("user doesn't exist");
      res.redirect("/info");
    
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

export const info = async (req, res) => {
  try {
    console.log("Info starting");
    res.render('home/info', { message: "Welcome to the info page!", user: req.user });
    console.log("Info done");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

export const verify = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user based on the provided email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      const error = "User does not exist";
      console.log(error);
      
      res.render("home/login", { error });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch && email === user.email) {
      // Passwords match, create a token and store the user ID in the session
      const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET);
      req.session.userId = user._id;
      req.session.token = token;
      res.redirect("/info");
    } else {
      // Passwords do not match
      const error = "Incorrect password or email";
      console.log(error);
      
      res.redirect("/login");
    }
  
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
