import React from "react";

export default function UserDropdown(props) {
  function openProfile() {
    props.openProfile();
    props.close();
  }

  function logout() {
    props.setLoggedIn(false);
    props.close();
  }

  return (
    <>
      <div>
        <button onClick={openProfile}>Profile</button>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}
