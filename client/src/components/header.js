import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div class="wrap header--flex">
            <NavLink to='/'><h1 className="header--logo">Courses</h1></NavLink>
                <nav>
                    <ul className="header--signedout">
                        <li><a href="sign-up.html">Sign Up</a></li>
                        <li><NavLink to="/sign-in">Sign In</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
  }
  
  export default Header;