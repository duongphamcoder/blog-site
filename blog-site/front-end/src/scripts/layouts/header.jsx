import { useState } from "react";
import { NavLink } from "react-router-dom";

import Button from "../components/button";

function Header() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <section className="header-wrapper">
      <nav className="navbar container">
        <ul className="navbar-group">
          <li className="navbar-group-item">
            <NavLink to="/">trang chủ</NavLink>
          </li>
          <li className="navbar-group-item">
            <NavLink to="/blog">bài viết</NavLink>
          </li>
          <li className="navbar-group-item">
            <NavLink to="/seting">cài đặt</NavLink>
          </li>
        </ul>
        <ul className={isLogin ? "navbar-group hiden" : "navbar-group"}>
          <li className="navbar-group-item">
            <Button type="btn-primary" text="đăng nhập" />
          </li>
          <li className="navbar-group-item">
            <Button type="btn-default" text="đăng ký" />
          </li>
        </ul>
        <ul
          className={isLogin ? "navbar-group is-login" : "navbar-group hiden"}
        >
          <li className="navbar-group-item">
            <NavLink to="#">
              <img
                src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/314605442_1300864160662956_2266900666723900298_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cfW49PymL6sAX-lI7bP&_nc_oc=AQl1CLF_Gd-PHkevYKETPxs7FOrPAv8OFl5ndde-pIwG0cO86mH5R1WqhJMTdHNG6M8&_nc_ht=scontent.fdad3-4.fna&oh=00_AfAXFuIofGRlg_POcu6hhOwOA9_vGqxWoFBL5uTAX7G6cw&oe=636D87D9"
                alt="image user"
              />
              <span>pham tan duong</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Header;
