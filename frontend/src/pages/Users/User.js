import React from "react";

const User = ({ user }) => {
  return (
    <div id="user-topic-wrapper">
      <ul id="userBar">
        <li>
          <img style={{ width: "30%", height: "30%", padding: 0 }} src={user.avatar} className="topic-avatar" alt="" />
        </li>
        <li>
          <a href={`/users/user/${user._id}`}><h2>{user.userName}</h2></a>
        </li>
        <li>
          <h2>{user.email}</h2>
        </li>
      </ul>
      <br />
    </div >
  );
};

export default User;
