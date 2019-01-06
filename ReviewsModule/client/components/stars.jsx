import React from 'react';
import TimeAgo from 'timeago-react';

//star rating, username and date for each review
//timeago converts date into how long ago the date was
const Stars = (props) => {
	
  return (
	  <React.Fragment>
      <div className="sud">
        {props.stars}
        <span className='username-date'>
          {props.User + ' - '} 
          <TimeAgo
            datetime={props.Date} 
          />
        </span>
      </div>
    </React.Fragment>
  )
}

export default Stars;