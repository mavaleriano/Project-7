// Class container where data can be managed with state
import React from 'react';
import Photo from './Photo';

class PhotoContainer extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            mounted: false
        };
    }
    
    //Used this to prevent infinite loop when trying to check for results with no images
    componentDidMount(){ 
        this.setState({
            mounted: true
        });
    }

    render () { 
        // Saves props.data into results and then save the query into title to be later displayed
        const results = this.props.data;
        let title = this.props.query.toString().toUpperCase();

        // This checks the path and if its one of the pre-loaded links, it will manually change the title to the correct one
        if (this.props.match.path === "/cats")
        {
            title = "CATS";
        }
        if (this.props.match.path === "/dogs")
        {
            title = "DOGS";
        }
        if (this.props.match.path === "/sunsets")
        {
            title = "SUNSETS";
        }

        // Setting correct response when there is no results
        if(results.length === 0 && this.state.mounted)
        {
            title = `No results found for ${title}, try a different search..`;
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

/** CODE THAT I WAS TOO AFRAID TO DELETE
 * // Trying to take care of times when query is not the default
        // This works by just calling the newQuery function whenever its not just "localhost:3000"
        // if(this.props.match.params.thing)
        // {
        //     let thing = this.props.match.params.thing.toString();
        //     console.log("thing: " + thing);
        //     let query = this.props.query.toString();
        //     if (thing === query)
        //     {
        //         console.log("FINALLY");
        //     }
        //     else
        //     {
        //         this.props.newQuery(thing);
        //         if(this.props.data.length === 0)
        //         {

        //         }
        //     }
        // }
 * 
 */