import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch} from 'react-router-dom';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';
import apiKey from './config';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      pics: []
    };
  }

  /*
    Making sure to call this as soon as component mounts
  */
  componentDidMount() {
    this.searchFetch();
  }
  /*
    Creating this searchFetch outside of componentDidMount so i can use it outside of componentDidMount
    This sends the fetch request and sets the response to state
  */
  searchFetch = (query = "Soccer") => 
  {
    console.log(query);
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1&content_type=1`)
      .then(response => response.json())
      .then(responseData => 
      {
        this.setState({ pics: responseData.photos.photo });
      })
      .catch(error => 
      {
        console.log('Error fetching and parsing data', error);
      })
  }

  

  render() {
    return (
      // <BrowserRouter>
        <div className="container">
          <SearchForm /> 
          <Nav search={this.searchFetch} />
          <PhotoContainer 
            data={this.state.pics}
            search={this.searchFetch} />

          {/* <Switch>
            <Route exact path="/" render={ (props) => <PhotoContainer data={this.state.pics} /> } />
            <Route path="/:animal" render={ (props) => <PhotoContainer search={this.searchFetch} /> } />
          </Switch> */}
        </div>
      // </BrowserRouter>
    );
  }
}

export default App;
