import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie'

const Header = () => {
    const [cookies, setCookie] = useCookies(['username', 'userpassword', 'userinfo'])
    return (
        <header>
            <div class="wrap header--flex">
            <NavLink to='/'><h1 className="header--logo">Courses</h1></NavLink>
                <nav>
                    {cookies?.username === undefined? (
                <ul className="header--signedout">
                        <li><NavLink to="/sign-up">Sign up</NavLink></li>
                        <li><NavLink to="/sign-in">Sign In</NavLink></li></ul>
                    ):(<ul className="header--signedout">
                    <li>Welcome, {cookies.userinfo}!</li>
                    <li><NavLink to="/sign-out">Sign Out</NavLink></li></ul>)}
              </nav>
            </div>
        </header>
    );
  }
  
  export default Header;