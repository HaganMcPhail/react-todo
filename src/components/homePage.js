"use strict";

var React = require('react');
var Router = require('react-router');
var Input = require('./input');
var TodoList = require('./list/todoList');
var Link = Router.Link;

var Home = React.createClass({
	getInitialState: function() {
		return {
			todoItems: [],
			completedItems: [],
			count: 1
		};
	},

    handleSubmit: function(e) {
	    var newItem = {id: this.state.count, value: event.target.value};
	    if( e.keyCode == 13 ) {
	        var list = this.state.todoItems;
	        list.push(newItem);
	        this.setState({todoItems: list, count: this.state.count + 1});
	        event.target.value = '';
	        console.log(this.state.todoItems);
	    }
    },

	render: function() {
		var list;

		return (
			<div>
				<input
					name="add-todo"
					className="text-box"
					placeholder="What needs to be done?"
					value={this.value}
					onKeyDown={this.handleSubmit} />
				<TodoList items={this.state.todoItems} />
			</div>
		);
	}
});

module.exports = Home;