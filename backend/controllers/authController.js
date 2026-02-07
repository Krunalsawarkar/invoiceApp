const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//@desc    Register New User
//@route   POST api/auth/register
//@access  public

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //validate data
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are Required" });
    }

    //Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ messsage: "User already exists" });
    }

    // Create User;
    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      message: "Server Error while registering user",
      error: error.message,
    });
  }
};

//@desc    Login User
//@route   POST api/auth/login
//@access  public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are Required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        businessName: user.buisnessName || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error while login user" });
  }
};

//@desc    Get current loggedin User
//@route   Get api/auth/me
//@access  private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      businessName: user.buisnessName || "",
      address: user.address || "",
      phone: user.phone || "",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error while fetching user" });
  }
};

//@desc    Update User Profile
//@route   POST api/auth/me
//@access  private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.buisnessName = req.body.buisnessName || user.buisnessName;
      user.address = req.body.address || user.address;
      user.phone = req.body.phone || user.phone;

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        buisnessName: updatedUser.buisnessName,
        address: updatedUser.address,
        phone: updatedUser.phone,
      });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error while update user" });
  }
};

module.exports = { registerUser, loginUser, getMe, updateUserProfile };
