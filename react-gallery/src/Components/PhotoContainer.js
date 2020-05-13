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
    
    componentDidMount(){
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
                this.props.newQuery(thing);
                if(this.props.data.length === 0)
                {

                }
            }
        }
        this.setState({
            mounted: true
        });
    }

    render () {
        console.log("skipped mounting");  
        const results = this.props.data;
        let title = this.props.query.toString().toUpperCase();
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
        // **** TRYING TO CHANGE URL HERE **** But for some reason history.push doesnt appear to change it
        // The counter > 0 is because it goes into infinite loop because of the initial run of the program without fetch
        console.log("results.length: " + results.length + " counter: " + this.state.mounted);
        
        if(results.length === 0 && this.state.mounted)
        {
            title = `No results found for ${title}, try a different search..`;
            console.log(title);

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