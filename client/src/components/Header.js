import React, {useContext}from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './Context';
const Header = () => {
    const {currentUser} = useContext(UserContext);
    return (
        <header>
            <div className="wrap header--flex">
                <NavLink to='/'><h1 className="header--logo">Courses</h1></NavLink>
                <nav>
                    {currentUser?.username === "" ? (
                        <ul className="header--signedout">
                            <li><NavLink to="/signup">Sign up</NavLink></li>
                            <li><NavLink to="/signin">Sign In</NavLink></li></ul>
                    ) : (<ul className="header--signedout">
                        <li>Welcome, {currentUser.userinfo}!</li>
                        <li><NavLink to="/signout">Sign Out</NavLink></li></ul>)}
                </nav>
            </div>
        </header>
    );
}

export default Header;