const jwt =require('jsonwebtoken')
const User=require('../models/user')
const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;
    // console.log("requireAuth token",token)
    if (token){
        jwt.verify(token,'secret code', async (err,decodedToken)=>{
            if(err){
                // console.log("error in Auth ",err.message);
                // response.redirect('/login');
                // res.send("require auth failes")
                return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
            }
            else{
                 console.log("decoded token in requireAuth",decodedToken);
                next()
            }
        })
    }
    else{
          res.redirect('/login')
        //  return res.send("require auth failes")
    }
}

// checking user 
const checkUser= (req,res,next)=>{
    
    const token=req.cookies.jwt;
    // console.log("usercheck token",token)
    if (token){
        jwt.verify(token,'secret code', async (err,decodedToken)=>{
            if(err){
                console.log(err.messgae);
                // res.locals.user=null
                req.user =null
                
            
            }
            else{
                // console.log(decodedToken);
                 let user=await User.findById(decodedToken.id);
                // res.locals.user=user
                // console.log("ckeckuser",user)
                req.user = user

            }

                next()
            
        })  

    }
    else{
        res.user=null
        next() ;
    }
}
module.exports= {requireAuth,checkUser}