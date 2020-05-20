// Component for displaying a user friendly message when the search returns no results
import React from 'react';
import img from './404img1.png';

/**
 * Used the below website to make sure I knew how to include image correctly
 * Below class prints out the 404 error when unavailable page is requested
 * https://www.edwardbeazer.com/importing-images-with-react/
 */

class NotFound extends React.Component {
    render() {
        return (
            <div className="not-found">
            <h2>No results found</h2>
            <p>Your url did not match any allowed results. Please try again..</p>
            <img src={img} alt="website logo" />
          </div>
        );
    }
}

export default NotFound;