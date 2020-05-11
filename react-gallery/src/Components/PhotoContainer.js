// Class container where data can be managed with state
import React from 'react';
import Photo from './Photo';
import SearchForm from './SearchForm';

class PhotoContainer extends React.Component {
    render () {
        if (!this.props.data)
        {
            let animal = "cats"; //this.props.match.params.animal;
            this.props.search(animal);
            
            
        } else {
            let temp = this.props.data;
        }

        const results = this.props.data;
        console.dir(results);

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