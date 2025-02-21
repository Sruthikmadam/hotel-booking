const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = require("../models/user.js")
const bcrypt = require('bcrypt')

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered"
  }
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrrect"
  }
  if (err.code === 11000) {
    err.email = "that email is already registered"
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }
  return errors;
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret code', { expiresIn: maxAge });
}
router.post('/register', async (req, res) => {
  const { email, password, name, isAdmin } = req.body;
  console.log("bodypass", req.body)

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    const salt = await bcrypt.genSalt();
    let hashpassword = await bcrypt.hash(password, salt);
    console.log("password", hashpassword)
    user = await User.create({ email, hashpassword, name, isAdmin })
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, path: '/', maxAge: maxAge * 1000 });
    res.status(201).json({ user: user.name })
  }
  catch (err) {
    res.status(400).json(err)

  }
})
router.get('/check-cookie', (req, res) => {
  console.log(req.cookies);
  res.send("cookie", req.cookies);
});




router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("password", password)
  try {
    const user = await User.findOne({ email });
    console.log(user)
    console.log("userpassword", user.hashpassword)
    if (user) {
      const auth = await bcrypt.compare(password, user.hashpassword);
      if (auth) {
        console.log("auth", user)
        const token = createToken(user._id);
        console.log("token", token)
        res.cookie('jwt', token, {
          httpOnly: true, path: '/', secure: false, // Change to true in production with HTTPS
          sameSite: "Strict", // Prevent CSRF attacks  
          maxAge: maxAge * 1000
        });
        return res.status(200).json({ user: user.name })

      }
      throw Error('incorrect password')
    }
  }
  catch (err) {

    return res.status(400).json({ err })
  }
});
router.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get("/user", async (req, res) => {
  try {
    const result = req.user
    if (!result) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/logout", (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // expire the cookie immediately
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});



module.exports = router