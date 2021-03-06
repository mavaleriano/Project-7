// Nav component for the apps navigations links
// Stateless functional components
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Below class uses Link to easily switch you to correct route and provide correct pictures
 */
class Nav extends React.Component {
    render() {
        return (
            <nav className="main-nav">
                <ul>
                    <li><Link to='/cats'>Cats</Link></li>
                    <li><Link to='/dogs'>Dogs</Link></li>
                    <li><Link to='/sunsets'>Sunsets</Link></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;