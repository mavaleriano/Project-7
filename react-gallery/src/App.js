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
      pics: [],
      curQuery: "soccer"
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
  searchFetch = (query = this.state.curQuery) => 
  {
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

  handleQuery = (newQuery) => {
    this.setState( prevState => {
      return { 
        curQuery: newQuery 
      };    
    });
    this.searchFetch()
  }

  render() {
    return (
       <BrowserRouter>
        <div className="container">
          <SearchForm /> 
          <Nav search={this.searchFetch} />

          <Switch>
            <Route exact path="/" render={ (props) => 
              <PhotoContainer 
                data={this.state.pics}
                search={this.searchFetch} 
                /> } />

            <Route exact path="/:animal" render={ (props) => 
              <PhotoContainer
              data={this.state.pics} {...props}
              query={this.state.curQuery}
              search={this.searchFetch}
              newQuery={this.handleQuery}
              /> } />

          </Switch>
        </div>
       </BrowserRouter>
    );
  }
}

export default App;
