const jwt = require('jsonwebtoken')
const User = require('../models/user')
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret code', async (err, decodedToken) => {
            if (err) {

                return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
            }
            else {
                console.log("decoded token in requireAuth", decodedToken);
                next()
            }
        })
    }
    else {
        res.redirect('/login')

    }
}

// checking user 
const checkUser = (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'secret code', async (err, decodedToken) => {
            if (err) {
                console.log(err.messgae);
                req.user = null


            }
            else {

                let user = await User.findById(decodedToken.id);

                req.user = user

            }

            next()

        })

    }
    else {
        res.user = null
        next();
    }
}
module.exports = { requireAuth, checkUser }