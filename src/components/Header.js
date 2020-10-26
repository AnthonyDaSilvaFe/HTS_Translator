import React from "react";
import "../styles/header.css";

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img src="../images/logo.jpg" alt="logo" />
      </div>
    );
  }
}
