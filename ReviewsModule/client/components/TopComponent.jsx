import React from 'react';
import Img from 'react-image';

//Top of component
//Ratings and Reviews + Big Stars

var TopComponent = (props) => {
  //count of reviews
  const numReviews = props.reviews.length;
  
  //collect all the stars and gets the average star rating for all reviews
  let allStarRatings = [];
  for (let i = 0; i < numReviews; i++) {
    allStarRatings.push(props.reviews[i].stars)
  }
  let avg = ''
  if (allStarRatings[0]) {
    avg = Math.floor(allStarRatings.reduce((a,b) => a + b) / numReviews)
  }
  
   //renders stars based on rating.
  const stars = () => {
    let starsarr = [];
    for (let i = 0; i < avg; i++) {
      starsarr.push(<Img key={'topstarF' + i} className='t-s' src={require('../../public/filled.png')} />)
    } 
    if (starsarr.length === 5) {
      return starsarr;
    } else {
      for (let i = starsarr.length - 1; i < 4; i++) {
        starsarr.push(<Img key={'topstarE' + i } className='t-s' src={require('../../public/empty.png')} />)
      }
      return starsarr;
    }
  }

  return ( 
		<React.Fragment>
		  <h1>Ratings & reviews <a href="">{numReviews}</a></h1>
		  <div className='star-container'>
		    {stars()}
		  </div>
    </React.Fragment>
	)
}

export default TopComponent;