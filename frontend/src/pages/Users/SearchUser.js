import React, { useState } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users.actions/getUsers";
import { searchByUsername } from "../../actions/users.actions/searchByUsername";

const SearchUser = () => {
  let [searchedUsername, setSearchedUsername] = useState("");

  const onChange = (e) => setSearchedUsername(e.target.value);

  const searchForUser = () => {
    if (searchedUsername === "" || searchedUsername === null) getUsers();
    else searchByUsername(searchedUsername);
  };
  return (
    <header className="users-header">
      <form >
        <span>
          <input
            type="text"
            onChange={(e) => onChange(e)}
            value={searchedUsername}
          />
          <button
            className="user-search-button app_color_background font__p font__bold"
            onClick={() => searchForUser()}
          >
            Search for user
        </button>
        </span>
      </form>
    </header>
  );
};

export default connect(null, { searchByUsername, getUsers })(SearchUser);
