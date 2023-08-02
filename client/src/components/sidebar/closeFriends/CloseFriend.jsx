import React from "react";
import "./closeFriend.css";

function closeFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img
        src={PF + user.profilePicture}
        alt="Sidebar Friend"
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}

export default closeFriend;
