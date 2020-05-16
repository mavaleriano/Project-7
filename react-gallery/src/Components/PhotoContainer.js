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
    // Takes care of showing initial loading screen and has delay to make sure that it shows
    componentDidMount(){ 
          this.loadingPrompt
            .then(val => console.log(val))
            .then(() => 
                this.setState({ 
                    mounted: true 
                }));
    }

    loadingPrompt = new Promise ( (resolve, reject) => {
        setTimeout(() => {
            resolve('Setting delay to show loading..');
        }, 1000);
    })

    render () {
        // This first if will make sure the right content is displayed each time you use the back and forward buttons
        if((this.props.match.params.thing) && (this.props.query !== this.props.match.params.thing))
         {
             this.props.search(this.props.match.params.thing);
         }
         // This will make sure the default path "/" gets set back to soccer when going back and forward
         if(!this.props.match.params.thing && this.props.query !== "soccer")
         {
             this.props.search("soccer");
         }
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

        // Setting correct response when there is no results and while waiting
        if(results.length < 1 && this.state.mounted && this.props.isSearch)
        {
            title = `No results found for ${title} yet.. try a different search..`;
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
          
        /**
         * Used below website to figure out about conditional rendering for "Loading.."
         * https://www.robinwieruch.de/conditional-rendering-react
         */
        
        return (
            <div>
                {this.state.mounted 
                    ? <div className="photo-container"><h2>{title}</h2><ul>{pics}</ul></div>
                    : <h1>Loading your content :D</h1>
                }
            </div>
        );
    }
}

export default PhotoContainer;