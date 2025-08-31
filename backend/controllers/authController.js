import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Failed! All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Failed! User already exists" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Failed! Password must be at least 8 characters" });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        message:"Success! User registered successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, 
      });
    } else {
      res.status(400).json({ message: "Failed! Invalid User data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Failed! Email and password are required" });
    }
    
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Failed! Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Failed! Invalid email or password" });
    }

    const token = user.generateToken();

    res.status(200).json({
      message: "Success! Login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message:"Failed! Login failed",error:error.message });
  }
};


export const logoutUser = (req,res)=>{
    res.cookie('jwt','', { httpOnly: true, expires: new Date(0) });
    res.json({ message: "Logged out successfully" });
}

export const me = async (req, res) => {
  try {
    res.json(req.user); 
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}