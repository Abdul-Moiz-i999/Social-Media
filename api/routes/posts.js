const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The Post has been updated.");
    } else res.status(403).json("You can only update your own post");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has successfully been deleted");
    } else res.status(403).json("You can only delete your own posts");
  } catch (err) {
    res.status(500).json(err);
  }
});

// like or dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const { userId } = req.body;
    const { id: postId } = req.params;
    const post = await Post.findById(postId);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Successfully Liked the Post");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Successfully Disliked the Post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((id) => Post.find({ userId: id }))
    );
    res.status(200).json(userPosts.concat(friendPosts[0]));
  } catch (err) {
    res.status(500).json(err);
  }
});

// get users all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
