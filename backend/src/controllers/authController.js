import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) =>
{
  try
  {
    const { username, password } = req.body;
    if (!username || !password)
    {
        return res.status(400).json({ error: "All fields are required" });
    }
    const result = await User.findOne({ username });
    if (result)
    {
        return res.status(400).json({ error: "Username already taken" });
    }
    const pass = await bcrypt.hash(password, 10);
    const user = await User.create({username,password: pass,});
    res.status(201).json({ message: "User registered successfully", user });
  }
  catch (errors)
  {
    console.error(errors);
    res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req, res) =>
{
  try
  {
    const { username, password } = req.body;
    if (!username || !password)
    {
        return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user)
    {
        return res.status(400).json({ error: "Invalid credentials" });
    }
    const result = await bcrypt.compare(password, user.password);
    if (result === false)
    {
        return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );
    res.json({message: "Login successful",token,user: { id: user._id, username: user.username }});
  }
  catch (errors)
  {
    console.error(errors);
    res.status(500).json({ error: "Server error" });
  }
};
