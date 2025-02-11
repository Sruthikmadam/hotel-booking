const express=require("express")

const router=express.Router()
const User= require("../models/user.js")




router.post('/register', async (req, res) => {
  const { email, password,name } = req.body;
  const newuser = new User({email,password,name});

  try {
      const user1= await User.findOne({email})
      if(user1){  return res.status(400).json({ message: 'Email already in use' });}
    
      const user = await newuser.save();
      return res.status(201).json({ message: 'User registered successfully', user });
     
  }
   catch (error) {
      // Log the error for debugging
      console.error("Error details:", error.message, error.stack);

      // Handle duplicate email error
      if (error.code === 11000) {
          return res.send({ message: 'Email already in use' });
      }

      return res.status(500).json({ message: 'An error occurred during registration' });
  }
});



router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password)
  try {
    const user= await User.findOne({email:email,password:password})
    if(user){
      const temp= {
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        userid:user._id
      }
    return res.send(temp)}
    else{return res.status(400).json({message:"login failed"})}
  } catch (error) {
    return res.status(500).json({message:"internal server error"})
  }
});
router.get('/getallusers',async(req,res)=>{
try {
  const users= await User.find()
  res.send(users)
} catch (error) {
  return res.status(400).json({error})
}
})

module.exports=router