import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./profile.css";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { username } = useParams();

  useEffect(() => {
    const getData = async () => {
      const fetched = await axios.get(`/users/?username=${username}`);
      // console.log("Fetched Data is ");
      // console.log(fetched.data);
      setUser(fetched.data);
    };
    getData();
  }, [username]);
  // console.log("user is ");
  // console.log(user);

  if (Object.keys(user).length !== 0) {
    return (
      <>
        <Topbar />
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  src={
                    user.coverPicture
                      ? PF + user.coverPicture
                      : `${PF}post/8.jpeg`
                  }
                  alt="User Cover"
                  className="profileCoverImg"
                />
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : `${PF}person/8.jpeg`
                  }
                  alt="Profile"
                  className="profileUserImg"
                />
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
              </div>
            </div>
            <div className="profileRightBottom">
              <Feed username={username} />
              <Rightbar user={user} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Profile;
