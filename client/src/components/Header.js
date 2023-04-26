import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };


    return (
        <header className= "header">
            <h1>The Visible Hand</h1>
            <div className="container flex-row justify-space-between-lg justify-center align-center">
                <div>
                    {Auth.loggedIn() ? (
                        <>
                            <span>Hey there, {Auth.getProfile().data.username}!</span>
                            <button className="btn btn-lg btn-light m-2" onClick={logout}>
                                Logout
                            </button>
                            <Link className="btn btn-lg btn-info m-2" to="/update">
                                Update
                            </Link>
                            <Link className="btn btn-lg btn-info m-2" to="/createpost">
                                Create Post
                            </Link>

                        </>
                    ) : (
                        <>
                            
                            <Link className="btn btn-lg btn-light m-2" to="/login">
                                Login
                            </Link>
                            <Link className="btn btn-lg btn-light m-2" to="/signup">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;