"use strict";

var React = require('react');
var Router = require('react-router');
var Input = require('../input');
var Link = Router.Link;

var CompletedList = React.createClass({

	render: function() {
		return (
			<div>
				{
		          this.state.todoItems.map(function(item) {
		            return <div className="item" key={item}>{item}</div>
		          })
			    }  
			</div>
		);
	}
});

module.exports = CompletedList;