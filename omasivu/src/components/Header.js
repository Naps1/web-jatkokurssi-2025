import React from "react";

const Header = () => {
  return (
    <header className="header">
      <h1>My glorious web page</h1>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
