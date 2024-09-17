const usr = require('../models/user');
const jwt = require('jsonwebtoken');
const {db} = require('../config/db')
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
        const token = jwt.sign({userId: user.id}, 'scrt', {expiresIn: '1h'});
        res.json({token});
        console.log('tokenok');
    }catch(ex){
        res.status(500).json({message: 'server side problem'});
    }
});

router.post('/logout', (req,res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'exit ok.' });
});

router.post('/userdata', async (req,res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
        console.log(token);
        if (!token) {
          return res.status(401).json({ message: 'no token' });
        }
        const decoded = jwt.verify(token, 'scrt'); 
        if (!decoded) {
          return res.status(401).json({ message: 'unauth token' });
        }
        const userId = decoded.userId; 
        db.query('SELECT * FROM user_data WHERE user_id = ?', [userId], (err, results) => {
            if (ex) {
              return res.status(500).json({ error: ex.message });
            }
            res.json(results);
          });
    
      } catch (ex) {
        console.error(ex);
        res.status(500).json({ message: 'server sidde error' });
      }
    
    
})

module.exports = router;