import React from 'react';
import Review from './review.jsx';
import Helpful from './helpful.jsx';
import Stars from './stars.jsx'
import Img from 'react-image';

class PositiveReviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      review: this.props.review
    }
  }
  
  //renders stars based on rating.
  stars() {
    let starsarr = [];
    let Stars = this.props.review.stars
    for (var i = 0; i < Stars; i++) {
      starsarr.push(<Img key={'posstarF' + i} className='small-star' src={require('../../public/filled.png')} />)
    } 
    if (starsarr.length === 5) {
      return starsarr;
    } else {
      for (var i = starsarr.length - 1; i < 5; i++) {
        starsarr.push(<Img key={'posstarE' + i } className='small-star' src={require('../../public/empty.png')} />)
      }
      return starsarr;
    }
  }

  render() {
    return(
      <React.Fragment>
        <div className="review-container">
          <h3>{this.props.review.title}</h3>
          <h4>(would recommend)</h4>
          <Stars stars={this.stars()} 
          User={this.props.review.username}
          Date={this.props.review.date} />
          <Review review={this.props.review.review}/>
          <Helpful review={this.props.review} />
        </div>
      </React.Fragment>
  )
 }
}

export default PositiveReviews;