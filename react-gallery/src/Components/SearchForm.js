// To search stuff. Keep track of it with state: so make it class component
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Below site helped me figure out how to get params object to header component
//https://stackoverflow.com/questions/53539314/what-is-withrouter-for-in-react-router-dom

class SearchForm extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };
    //Used below website as reference to try to make sure that search bar worked
    //https://therichpost.com/get-input-field-value-button-click-reactjs/
    constructor(props)
    {
        super(props);
        this.state = {
            value: '',
            loading: false
        };
        this.newSearch = this.newSearch.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    // Upon search submitted, it takes the value and called the newQuery function to request new fetch. It then uses the history object to update the url
    // https://stackoverflow.com/questions/47253186/react-passing-two-functions-as-a-call-backs-to-this-setstate
    /**
     * 
     * The way I got this to work as sending to callbacks to setState
     * First it changes loading to true and changes the url.
     * Then it calls newQuery to fetch new data and then sets the state back to false after the data has been received
     */
    newSearch(e)
    {
        e.preventDefault();
        if(this.state.value !==undefined)
        {
            this.setState({ loading: true }, () => {
                (() => {
                    let thing = this.state.value.toString();
                    const { history } = this.props;
                    let path = `/search/${thing}`;
                    if (history) history.push(path);
                    this.props.newQuery(thing);
                })();
                setTimeout(() => {
                    console.log('To reduce or increase time to show loading screen: SearchForm.js');
                    this.setState({loading: false});
                }, 1000);
            });
        }
    }

    updateInput(e)
    {
        this.setState({
            value: e.target.value 
        });
    }

    render() {
            
        return (
            <div>
                <form onSubmit={this.newSearch} className="search-form">
                    <input type="search" onChange={this.updateInput} name="search" placeholder="Search" required/>
                    <button type="submit" className="search-button">
                    <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                    </button>
                </form>
                <div>
                    <h3>
                        {this.state.loading
                            ? <p>Waiting for search results..</p>
                            : <p></p>
                        }
                    </h3>
                </div>
            </div>
        );
    }
}


export default withRouter(SearchForm);