// Class container where data can be managed with state
import React from 'react';
import Photo from './Photo';

class PhotoContainer extends React.Component {
    
    handleQuery = (thing) => {
        this.props.newQuery(thing)
    }

    render () {
        let counter = 0; //(controling for init exe of code)
        // Trying to take care of times when query is not the default
        // This works by just calling the newQuery function whenever its not just "localhost:3000"
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
                this.handleQuery(thing);
            }
        }
        const results = this.props.data;
        let title = this.props.query.toString().toUpperCase();

        // Setting correct response when there is no results
        // **** TRYING TO CHANGE URL HERE **** But for some reason history.push doesnt appear to change it
        // The counter > 0 is because it goes into infinite loop because of the initial run of the program without fetch
        if(results.length === 0 && counter > 0)
        {
            this.props.history.push(`/${title}`);
            title = "NO RESULTS FOUND FOR " + title;

        }

        // Setting correct response when its cats, dogs or sunsets
        // Planning on changing url to correct search result here
        if(this.props.query.toString() !== "cats")
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
            counter =+ 1; //UPDATING counter here
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