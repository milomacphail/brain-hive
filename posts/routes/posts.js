const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Post = require("../models/Post");

// @route		POST api/posts/
// @desc		create new post
// @access	private
router.post("/", auth, async (req, res) => {
  // TODO: add validation.

  const postData = {
    owner: {
      uuid: req.profile.uuid,
      firstName: req.profile.first_name,
      lastName: req.profile.last_name,
      avatar: req.profile.avatar,
    },
    ...req.body,
  };
  try {
    const newPost = await Post.create(postData);
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(401).json({ errors: { error } });
  }
});

// @route		GET api/posts/
// @desc		get all posts (implement pagination later);
// @access	public
router.get("/", async (req, res) => {
  try {
    // const PERPAGE = 10;
    // const page = req.query.pg;
    const posts = Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(401).json({ errors: { error } });
  }
});

module.exports = router;