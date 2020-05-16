import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch} from 'react-router-dom';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';
import NotFound from './Components/NotFound';
import apiKey from './config';
import './App.css';

/**
 * HEY! This is my project 7: React Gallery App
 * I'm aiming for Exceeds Expectations
 * Some of the top-most comments were just for myself as I tried to organize the project initially
 */

class App extends React.Component {
  // Below website is reference to what I used that recommended the use of checking if mounted
  // https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      pics: [],
      cats: [],
      dogs: [],
      sunsets: [],
      curQuery: "soccer",
      isSearch: false,
    };
  }

  /*
    Making sure to call this as soon as component mounts so fetch gets the required data
  */
  componentDidMount() {
    this._isMounted = true;
    this.searchFetch();
    this.searchCats();
    this.searchDogs();
    this.searchSunsets();
  }

  /*
    Creating this searchFetch outside of componentDidMount so i can use it outside of componentDidMount
    This sends the fetch request and sets the response to state
    I individually called the cats, dogs, and sunsets fetch
  */

  //**FOR GENERAL FETCHING */
  searchFetch = (query = this.state.curQuery) => 
  {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1&content_type=1`)
      .then(response => response.json())
      .then(responseData => 
      {
        this.setState({ 
          pics: responseData.photos.photo,
          curQuery: query
        });
        
      })
      .catch(error => 
      {
        console.log('Error fetching and parsing data', error);
      })
  }

  //**FOR CATS FETCHING */
  searchCats = (query = "cats") => 
  {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1&content_type=1`)
      .then(response => response.json())
      .then(responseData => 
      {
        this.setState({ cats: responseData.photos.photo });
        
      })
      .catch(error => 
      {
        console.log('Error fetching and parsing data', error);
      })
  }

  //**FOR DOGS FETCHING */
  searchDogs = (query = "dogs") => 
  {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1&content_type=1`)
      .then(response => response.json())
      .then(responseData => 
      {
        this.setState({ dogs: responseData.photos.photo });
        
      })
      .catch(error => 
      {
        console.log('Error fetching and parsing data', error);
      })
  }
  
  //**FOR SUNSETS FETCHING */
  searchSunsets = (query = "sunsets") => 
  {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1&content_type=1`)
      .then(response => response.json())
      .then(responseData => 
      {
        this.setState({ sunsets: responseData.photos.photo });
        
      })
      .catch(error => 
      {
        console.log('Error fetching and parsing data', error);
      })
  }

  /**
   * This takes care of the changing query value: it updates the state of curQuery and then calls the searchFetch function to get new data
   * Used below website as reference
   * https://learn.co/lessons/react-updating-state 
   */
  handleQuery = (newQuery) => {
    if (this._isMounted)
    {
      this.setState({
          curQuery: newQuery,
          isSearch: true
      }, () => this.searchFetch());
    }
  }

  componentWillUnmount() {
    this._isMounted =false;
  }
  
  render() {
    return (
       <BrowserRouter>
        <div className="container">
          <SearchForm //Both Searchform and Nav are headers so not included in Switch: learned the hard way!
            newQuery={this.handleQuery}
            isSearch={this.state.isSearch} 
          />
          <Nav search={this.searchFetch} />

          <Switch>
            <Route exact path="/" render={ (props) => // Takes care of initial/main page
              <PhotoContainer 
                data={this.state.pics} {...props}
                query={this.state.curQuery}
                search={this.searchFetch}
                newQuery={this.handleQuery}
                isSearch={this.state.isSearch}
                /> } />

            <Route exact path="/cats" render={ (props) => // Takes care of /cats page: each of the following also sends as props the corresponding data
              <PhotoContainer 
                data={this.state.cats} {...props}
                query={this.state.curQuery}
                search={this.searchFetch}
                newQuery={this.handleQuery}
                isSearch={this.state.isSearch}
                /> } />

            <Route exact path="/dogs" render={ (props) => // Takes care of /dogs page
              <PhotoContainer 
                data={this.state.dogs} {...props}
                query={this.state.curQuery}
                search={this.searchFetch}
                newQuery={this.handleQuery}
                isSearch={this.state.isSearch}
                /> } />

            <Route exact path="/sunsets" render={ (props) => // Takes care of /sunsets page
              <PhotoContainer 
                data={this.state.sunsets} {...props}
                query={this.state.curQuery}
                search={this.searchFetch}
                newQuery={this.handleQuery}
                isSearch={this.state.isSearch}
                /> } />

            <Route exact path="/search/:thing" render={ (props) => // Responds whenever something is searched and following route component takes care of notfound urls
              <PhotoContainer
                data={this.state.pics} {...props}
                query={this.state.curQuery}
                search={this.searchFetch}
                newQuery={this.handleQuery}
                isSearch={this.state.isSearch}
              /> } />
            
            <Route component={NotFound} /> 

          </Switch>
        </div>
       </BrowserRouter>
    );
  }
}

export default App;
