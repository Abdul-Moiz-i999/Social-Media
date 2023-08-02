const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const salt = 10;

// removed admin id //

router.put("/:id", async (req, res) => {
  if (req.body.userid === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
router.delete("/:id", async (req, res) => {
  if (req.body.userid === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted successfully.");
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(403).json("You can only delete your account");
});

// Getting a user based on query
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get the user rightbar followings friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map(async (friendId) => await User.findById(friendId))
    );
    // console.log(Array.isArray(friends));
    // let friendList = [];
    const friendList = friends.map((friend) => {
      return {
        _id: friend._id,
        username: friend.username,
        profilePicture: friend.profilePicture,
      };

      // return ({ _id, username, profilePicture } = friend);
      // console.log(_id, username, profilePicture);
      // friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, updatedAt, ...others } = user._doc;
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.put("/:id/follow", async (req, res) => {
  const { userId } = req.body;
  const { id: userToFollow } = req.params;
  if (userId !== userToFollow) {
    try {
      const userFollow = await User.findById(userToFollow);
      const currentUser = await User.findById(userId);
      if (!userFollow.followers.includes(userId)) {
        await userFollow.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { following: userToFollow } });
        res.status(200).json("User has been followed");
      } else res.status(403).json("You already follow the user!");
    } catch (err) {
      res.status(400).json(err);
    }
  } else res.status(403).json("You can't follow yourself!");
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  const { userId } = req.body;
  const { id: userToUnfollow } = req.params;
  if (userId !== userToUnfollow) {
    try {
      const userUnfollow = await User.findById(userToUnfollow);
      const currentUser = await User.findById(userId);
      if (userUnfollow.followers.includes(userId)) {
        await userUnfollow.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { following: userToUnfollow } });
        res.status(200).json("User has been unfollowed");
      } else res.status(403).json("You already unfollowed the user!");
    } catch (err) {
      res.status(400).json(err);
    }
  } else res.status(403).json("You can't unfollow yourself!");
});

module.exports = router;
