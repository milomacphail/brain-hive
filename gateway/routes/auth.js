const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authServer } = require('../config/default');

// @route		POST api/auth
// @desc		authentication route for the gateway
// @access	public
router.post('/', async (req, res) => {
  console.log('Gateway');
  try {
    let response;
    switch (req.body.action) {
      case 'registerUser':
        response = await registerUser(req.body.reqBody);
        break;
      case 'loginUser':
        response = await loginUser(req.body.reqBody);
        break;
      case 'registerProfile':
        response = await registerProfile(req);
        break;
      default:
        return res.status(404).json({ errors: { action: 'invalid request' } });
    }
    console.log('response from service');
    if (response.errors) throw response.errors;
    res.json(response.data);
  } catch (error) {
    console.error('error', error);
    res.status(500).json(error);
  }
});

const registerUser = async (body) => {
  console.log('gateway action registerUser');
  try {
    const response = await axios.post(`${authServer}/api/users/`, body);
    return response;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

const loginUser = async (body) => {
  console.log('gateway action login');
  try {
    const response = await axios.post(`${authServer}/api/users/login`, body);
    return response;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

const registerProfile = async (req) => {
  const token = req.header('x-auth-token');

  // decide if token is confirmed here or on microservice.
  try {
    axios.post(`${authServer}/api/profiles`, req.body, {
      headers: { 'x-auth-token': token },
    });
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

module.exports = router;
