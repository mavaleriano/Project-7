// Class container where data can be managed with state
import React from 'react';
import Photo from './Photo';
import SearchForm from './SearchForm';

class PhotoContainer extends React.Component {
    
    render () {
        // Trying to take care of times when query is not the default
        let thing = this.props.match.params.animal.toString;
        let query = this.props.query.toString();
        if (thing === query)
        {
            console.log("FINALLY");
        }
        else
        {
            this.props.newQuery(thing);
        }

        const results = this.props.data;

        let pics = results.map(pic => 
                <Photo
                    farm={pic.farm}
                    id={pic.id}
                    secret={pic.secret}
                    server={pic.server}
                    title={pic.title}
                    key={pic.id}
                />
        );

        return (
            <div className="photo-container">
                <h2>Results</h2>
                    <ul>
                         {pics} 
                    </ul>
            </div>
        );
    }
}

export default PhotoContainer;