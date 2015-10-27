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

	//reusable remove and add functions
	// *****************************************************************************************************************/
	removeItemFromList: function(itemToRemove, listToRemoveFrom, list) {
		for(var i = 0; i < listToRemoveFrom.length; i++) {
		    var obj = listToRemoveFrom[i];

		    if(itemToRemove.id == obj.id) {
		        listToRemoveFrom.splice(i, 1);
		        i--;
		        if (list === 'todo') {
					listToRemoveFrom = this.state.todoItems;
					this.setState({todoItems: listToRemoveFrom});
				} else {
					listToRemoveFrom = this.state.completedItems;
					this.setState({completedItems: listToRemoveFrom});
				}
		    }
		}
	},

	addItemToList: function(itemToAdd, listToAddTo, list) {
		listToAddTo.push(itemToAdd);
		if (list === 'todo') {
			this.setState({todoItems: listToAddTo});
		} else {
			this.setState({completedItems: listToAddTo});
		}
	},

	// *****************************************************************************************************************/
	// Deletle Functions
	// *****************************************************************************************************************/

	deleteItemHandler: function(item, list) {
		var listToRemoveFrom;
		if (list === 'todo') {
			listToRemoveFrom = this.state.todoItems;
		} else {
			listToRemoveFrom = this.state.completedItems;
		}

		this.removeItemFromList(item, listToRemoveFrom, list);
	},

	deleteAllHandler: function(list) {
		if (list === 'todo') {
			this.setState({todoItems: []});
		} else {
			this.setState({completedItems: []});
		}
	},

	// *****************************************************************************************************************/
	// mark items as todo/complete
	// *****************************************************************************************************************/

	markItemCompletedHandler: function(item) {
		var listToRemoveFrom = this.state.todoItems,
			listToAddTo = this.state.completedItems;

		this.removeItemFromList(item, listToRemoveFrom, 'todo');
		this.addItemToList(item, listToAddTo, 'completed');
	},

	markItemTodoHandler: function(item) {
		var listToAddTo = this.state.todoItems,
			listToRemoveFrom = this.state.completedItems;

		this.removeItemFromList(item, listToRemoveFrom, 'completed');
		this.addItemToList(item, listToAddTo, 'todo');
	},

	// *****************************************************************************************************************/
	// handle text to add to the todo list
	// *****************************************************************************************************************/

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
						  onDeleteItem={this.deleteItemHandler}
						  onMarkCompleted={this.markItemCompletedHandler}
						  onMarkTodo={this.markItemTodoHandler} />
				
			</div>
		);
	}
});

module.exports = Home;