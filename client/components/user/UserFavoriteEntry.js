const React = require('react');

class UserFavoriteList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
  	
  	return(
      <li >
        <div className="collapsible-header">
          <span>{this.props.data.name}</span>
          <a href="#!" className="right"><i className="material-icons">loyalty</i></a>
        </div>
        <div className="collapsible-body">
          <p> {this.props.data.org_name}<br/>
          {this.props.data.descrption}<br/>
          <a href={this.props.data.html_url}>GITHUB</a>
          </p>
        </div>
      </li>
  	);
  }

}

module.exports = UserFavoriteList;