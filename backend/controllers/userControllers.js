const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

//@desc    Register new User
//@access  Public
//@route   POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exits");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc    Authenticate a user
//@access  Public
//@route   POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email })


  if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
  }else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  res.status(200).json({ message: "Login User" });
});

//@desc    Get user data
//@access  Private
//@route   GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
  res.status(201).json(req.user)
});

// Generate JWT
const generateToken = (id) => { 
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
 }


module.exports = {
  registerUser,
  loginUser,
  getMe,
};
