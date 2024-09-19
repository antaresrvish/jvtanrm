const usr = require('../models/user');
const jwt = require('jsonwebtoken');
const {db} = require('../config/db')
const express = require('express');
const multer = require('multer');
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
    db.query('SELECT * FROM user_data WHERE user_id = ?', [userId], (ex, results) => {
        if (ex) {
          return res.status(500).json({ error: ex.message });
        }
        res.json(results);
      });
  } catch (ex){
    console.log(ex);
    res.status(500).json({ message: 'server sidde error' });
  }
});


const upload = multer({ storage: multer.memoryStorage() });
router.post('/addcomp',upload.fields([
  { name: 'companyAvatar', maxCount: 1 },
  { name: 'companyPhoto', maxCount: 1 },
]),async (req, res) => {
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
  const { companyName, companyBio } = req.body;
  const avatar = req.files['companyAvatar'] ? req.files['companyAvatar'][0].buffer : null;
  const photo = req.files['companyPhoto'] ? req.files['companyPhoto'][0].buffer : null;
  const sql = `INSERT INTO user_data (user_id, compname, compbio, compavatar, comppic) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [userId, companyName, companyBio, avatar, photo], (ex, result) => {
    if (ex) {
      console.log("error while inserting to the database", ex);
      return res.status(500).json({ message: 'database error' });
    }
    res.status(200).json({ message: 'comp creation success' });
  });
});

router.delete('/deletecomp/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sql = 'DELETE FROM user_data WHERE data_id = ?';
  db.query(sql, [id], (ex, results) => {
    if (ex) {
      return res.status(500).json({ error: 'error while deleting' });
    }
    res.status(200).json({ message: 'item deleted.' });
  });
});

module.exports = router;