// A photo component that displays the li and img elements
// Stateless functional component: Receive data via props
import React from 'react';

//https://www.flickr.com/services/api/misc.urls.html

const Photo = (props) => {
        let url = `https://farm${props.farm}.staticflickr.com/${props.server}/${props.id}_${props.secret}.jpg`;
        return (
            <li>
                <img src={url} alt={props.title} key={props.id}/>
            </li>
        );
}

export default Photo;