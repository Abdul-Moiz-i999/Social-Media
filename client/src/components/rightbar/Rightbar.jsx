import Online from "./online/Online";
import "./rightbar.css";
import AddIcon from "@mui/icons-material/Add";

import { Users } from "../../dummyData";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id)
  );
  // console.log("user is ");
  // console.log(user);
  console.log(followed);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };

    user && getFriends();
  }, [user]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="rightbarContainer">
          <img src={`${PF}gift.png`} alt="Gift" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and
            <b>3 other friends</b> have a birthday todat{" "}
          </span>
        </div>
        <img src={`${PF}ad.png`} alt="Ad" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => u.id !== 1 && <Online key={u.id} user={u} />)}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const handleFollow = async () => {
      try {
        console.log("user.following");
        console.log(user.following);
        if (followed) {
          await axios.put("/users/" + user._id + "/unfollow", {
            userId: currentUser._id,
          });
          dispatch({ type: "UNFOLLOW", payload: user._id });
        } else {
          await axios.put("/users/" + user._id + "/follow", {
            userId: currentUser._id,
          });
          dispatch({ type: "FOLLOW", payload: user._id });
        }
      } catch (err) {
        console.log(err);
      }
      setFollowed(!followed);
    };
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollow" onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"} <AddIcon />
          </button>
        )}
        <h4 className="rightbarTitle">User Information.</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                key={friend._id}
                to={"/profile/" + friend.username}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? `${PF + friend.profilePicture}`
                        : `${PF}person/5.jpeg`
                    }
                    alt="Profile"
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
