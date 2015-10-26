"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var List = React.createClass({

	render: function() {
		return (
			<div>
				{
		          this.props.items.map(function(item) {
		            return <div className="item" key={item}>{item}</div>
		          })
			    }  
			</div>
		);
	}
});

module.exports = List;