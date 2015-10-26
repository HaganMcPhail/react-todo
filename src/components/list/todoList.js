"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var TodoList = React.createClass({
	markCompleted: function(item) {
		var todoList = this.props.todoList,
			completedList = this.props.completedList,
			itemToRemove = item;
		todoList.splice(item.id, 1);
		this.setState({todoItems: todoList});
	},

	render: function() {
		var self = this;
		return (
			<div>
				{
		          this.props.todoList.map(function(item, i) {
		            return (
		            	<div className="item" key={item.id}>
		            		<span className="glyphicon glyphicon-ok check"
		            			onClick={self.markCompleted.bind(self, item)}></span>
		            		<span className="itemValue">{item.id} {item.value}</span>
		            		<span className="glyphicon glyphicon-trash delete"></span>
		            	</div>
		            )
		          })
			    }
			</div>
		);
	}
});

module.exports = TodoList;