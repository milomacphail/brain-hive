const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');
const config = require('../config/default');

//POST api/profiles/
//register profile to logged in user
//access private
router.post('/', auth, (req, res) => {
  res.json(req.user);
});

//GET api/profile/SELF
//get profile data of loggin in user
//private
router.get('/self', auth, async (req, res) => {
  try {
    const currentProfile = await pool.query('SELECT * FROM profile WHERE');
  }
});

module.exports = router;
