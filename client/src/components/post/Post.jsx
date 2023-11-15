import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Post({ post }) {
  const [like, setLike] = useState(post?.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post?.likes.includes(currentUser._id));
  }, [currentUser._id, post?.likes]);

  useEffect(() => {
    const getData = async () => {
      const fetched = await axios.get(`/users/?userId=${post.userId}`);
      setUser(fetched.data);
    };

    post && getData();
  }, [post?.userId]);

  const handleLike = async () => {
    try {
      await axios.put("/posts/" + post?._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/9.jpeg"
                }
                alt="Profile"
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post?.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post?.img && (
            <img src={PF + post?.img} alt="User Post" className="postImg" />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              alt="Like Icon"
              className="postLikeIcon"
              onClick={handleLike}
            />
            <img
              src={`${PF}heart.png`}
              alt="Heart Icon"
              className="postLikeIcon"
              onClick={handleLike}
            />
            <span className="postLikeCounter">{like} People Liked This!</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentCounter">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
