import React from 'react';

class PHID extends React.Component {
	constructor(props) {
		super(props)
	}


 render() {
  return (
  	<div className="item-form">
    <form onSubmit={this.props.handleSubmit}>
      <label>
        ID:
          <input type="number" max="100" min="1" name="ID" />
      </label>
        <input type="submit" value="Submit" />
    </form>
    </div>
  )
 }
}

export default PHID