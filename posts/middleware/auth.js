const axios = require("axios");
const authServer = require("../config/default").authServer;

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ errors: { msg: "No token, authorization denied" } });
  }

  try {
    const response = axios.get(`${authServer}/api/profiles/auth`, {
      headers: { "x-auth-token": token },
    });

    if (response.errors) throw response.errors;

    req.profile = response.data;
    next();
  } catch (error) {
    console.error("error", error);
    res.status(401).json({ errors: { error } });
  }
};