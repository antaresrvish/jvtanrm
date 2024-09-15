const usr = require('../models/user');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await usr.findByEmail(email);
        if(!user){
            return res.status(401).json({ message : 'no user'});
        }

        if(password != user.password){
            return res.status(401).json({message: 'password is not equal'});
        }
        const token = jwt.sign({userId: user.id}, 'your secret key', {expiresIn: '1h'});
        res.json({token});
        console.log('tokenok');
    }catch(ex){
        console.error(ex);
        res.status(500).json({message: 'server side problem'});
    }
});
module.exports = router;