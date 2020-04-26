const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');
const config = require('../config/default');

//GET api/profile/current_profile
//get profile data of logged-in user
//private
router.get('/current_profile', auth, async (req, res) => {
  try {
    const id = req.user.id;
    const { first_name, last_name, avatar, github, cohort } = req.body;

    const currentProfile = await pool.query(
      'SELECT * FROM profile WHERE aid =$1 AND first_name=$2 AND last_name=$3 AND avatar=$4 AND github=$5 AND cohort=$6',
      [id, first_name, last_name, avatar, github, cohort]
    );
    if (!currentProfile) {
      return res.status(400).json({ msg: 'No profile for this user.' });
    }
    res.status(200).json(currentProfile.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//POST api/profiles
//register profile to logged in user
//access private
router.post('/', auth, async (req, res) => {
  //res.json(req.user); //contains user

  const { id } = req.user;
  const { first_name, last_name, avatar, github, cohort } = req.body;

  try {
    let profile = await pool.query(
      'INSERT INTO profile (aid, first_name, last_name, avatar, github, cohort) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, first_name, last_name, avatar, github, cohort]
    );
    profile = profile.rows[0];
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: error });
  }
});

module.exports = router;
