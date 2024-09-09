import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Function to register a new user
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  //check user is unique means already exist
  const isValidUser = await User.findOne({ email });
  if (isValidUser) {
    // If user exists, throw an error
    return next(errorHandler(400, "User already exist"));
  }
  // Hash the password before saving it to the database
  const hashPassword = bcryptjs.hashSync(password, 10);
  // Create a new user instance
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  try {
    // Save the user to the database
    await newUser.save();
    //send response to fe
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

// Function to authenticate a user
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(errorHandler(400, "Email and password are required"));
    }
    // Check if the user exists by email
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(404, "User not found"));
    // Compare provided password with the hashed password in the database
    const checkUserPassword = bcryptjs.compareSync(
      password,
      validUser.password
    );

    if (!checkUserPassword)
      return next(errorHandler(401, "Invalid credentials"));
    //If user is valid, generate a JWT token ,if user email and password both are corrrect we need to generate token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    //not need to send user password in response to fe
    const { password: pass, ...rest } = validUser._doc;
    //send response to user in access_token is key and token its value
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Login successfully",
      user: rest,
    });
  } catch (error) {
    console.error("Error during sign-in:", error); // Log the error
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("access_token", { httpOnly: true });

    // Send a success response
    res.status(200).json({
      success: true,
      message: "User sign out successfully",
    });
  } catch (error) {
    next(error); // Pass any errors to the error handler
  }
};
