import React from 'react';

class Helpful extends React.Component {
constructor(props) {
  super(props)

  this.state = {
    upvotes: this.props.review.upvotes,
    upvoted: false,
    downvotes: this.props.review.downvotes,
    downvoted: false

  }
  
}
  //still have to implement incrementing count on click
    //report button acting like target report button

  increment(e) {
    if (e.target.textContent === 'yes' && this.state.upvoted === false && this.state.downvoted === false ) {
         
      this.setState({
        upvotes: this.state.upvotes += 1,
        upvoted: true
      })
       
    } else if (e.target.textContent === 'no' && this.state.downvoted === false && this.state.upvoted === false ) {
         
      this.setState({
        downvotes: this.state.downvotes += 1,
        downvoted: true
      })
      
    }
  }

  report(e) {
    var reported = false;
    if (reported === false) {
    e.target.textContent = 'reported'
    e.target.style.color = 'orange';
   }
  }





      render() {

        return (
    <React.Fragment>
      <p className="do-you">Do you find this helpful?</p>
      <div className="vote-container">
        <a className='a' href='#' onClick={this.increment.bind(this)}>yes</a>
        <p className='a'>{'(' + this.state.upvotes  + ')'}</p>
        <p className='a'>/</p>

        <a className='a' href="#" onClick={this.increment.bind(this)}>no</a>
        <p className='a'>{'(' + this.state.downvotes  + ')'}</p>
        <p className='a'>/</p>

        <a className='a' href="#" onClick={this.report.bind(this)}>report</a>

      </div>
    </React.Fragment>
  )
 }
}

export default Helpful