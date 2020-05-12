// Class container where data can be managed with state
import React from 'react';
import Photo from './Photo';

class PhotoContainer extends React.Component {
    
    render () {
        // Trying to take care of times when query is not the default
        if(this.props.match.params.thing)
        {
            let thing = this.props.match.params.thing.toString();
            console.log("thing: " + thing);
            let query = this.props.query.toString();
            if (thing === query)
            {
                console.log("FINALLY");
            }
            else
            {
                this.props.newQuery(thing);
            }
        }
        const results = this.props.data;
        let title = this.props.query.toString().toUpperCase();

        // Setting correct response when there is no results
        if(results.length === 0)
        {
            title = "NO RESULTS FOUND";
        }

        // Setting correct response when its cats, dogs or sunsets
        if(this.props.query.toString() === "cats")
        {
            
        }
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
            console.log(this.props.query);
        return (
            <div className="photo-container">
                <h2>{title}</h2>
                    <ul>
                         {pics} 
                    </ul>
            </div>
        );
    }
}

export default PhotoContainer;