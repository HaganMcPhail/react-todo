"use strict";

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Input = require('./input');
var TodoList = require('./list/todoList');
var CompletedList = require('./list/completedList');
var Link = Router.Link;

var Home = React.createClass({
	mixins: [
		Router.Navigation
	],

	getInitialState: function() {
		return {
			todoItems: [],
			completedItems: [],
			count: 0
		};
	},

	deleteItem: function(item) {
		var listToRemoveFrom = this.props.todoList;
		this.removeItemFromList(item, listToRemoveFrom);
	},

	deleteAllHandler: function(item, listToRemoveFrom) {
		console.log('remove all items');
		this.setState({todoItems: []});
		console.log(this.state);
	},

	handleSubmit: function(e) {
	    var newItem = {id: this.state.count, value: event.target.value};
	    if( e.keyCode == 13 ) {
	        var list = this.state.todoItems;
	        list.push(newItem);
	        this.setState({todoItems: list, count: this.state.count + 1});
	        event.target.value = '';
	        this.transitionTo('todo');
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

				<RouteHandler todoList={this.state.todoItems} 
						  completedList={this.state.completedItems}
						  onDeleteAll={this.deleteAllHandler}
						  onDelete={this.deleteItem} />
				
			</div>
		);
	}
});

module.exports = Home;