"use strict";

var React = require('react');
var Router = require('react-router');
var Input = require('../input');
var Link = Router.Link;

var TodoList = React.createClass({

	render: function() {
		//console.log(this.state.todoItems);
		return (
			<div>
				{
		          this.props.items.map(function(item) {
		            return <div className="item" key={item.id}>{item.value}</div>
		          })
			    }
			</div>
		);
	}
});

module.exports = TodoList;