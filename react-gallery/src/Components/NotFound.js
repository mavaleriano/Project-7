// Component for displaying a user friendly message when the search returns no results
import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
            <li className="not-found">
            <h3>No Results Found</h3>
            <p>You search did not return any results. Please try again.</p>
          </li>
        );
    }
}

export default NotFound;