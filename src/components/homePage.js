"use strict";

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var TodoList = require('./list/todoList');
var CompletedList = require('./list/completedList');
var _ = require('lodash');
var Link = Router.Link;

var Home = React.createClass({
	mixins: [
		Router.Navigation
	],

	getInitialState: function() {
		return {
			todoItems: [
				{
					'id':1,
					'value': 'test1'
				},
				{
					'id':2,
					'value': 'test2'
				}
			],
			completedItems: [],
			count: 3,
			showInput: false
		};
	},

	removeItemFromList: function(itemToRemove, list) {
		var removeList = this.state[list+'Items'];
		_.remove(removeList, itemToRemove);

		if (list === 'todo') {
			this.setState({todoItems: removeList});
		} else {
			this.setState({completedItems: removeList});
		}
	},

	addItemToList: function(itemToAdd, list) {
		var addList = this.state[list+'Items'];
		addList.push(itemToAdd);
		if (list === 'todo') {
			this.setState({todoItems: addList});
		} else {
			this.setState({completedItems: addList});
		}
	},

	deleteItemHandler: function(item, list) {
		this.removeItemFromList(item, list);
	},

	deleteAllHandler: function(list) {
		if (list === 'todo') {
			this.setState({todoItems: []});
		} else {
			this.setState({completedItems: []});
		}
	},

	changeItemListHandler: function(item, currentList){
		if (currentList === 'todo') {
			this.removeItemFromList(item, 'todo');
			this.addItemToList(item, 'completed');
		} else {
			this.removeItemFromList(item, 'completed');
			this.addItemToList(item, 'todo');
		}
	},

	markItemCompletedHandler: function(item) {
		var listToRemoveFrom = this.state.todoItems,
			listToAddTo = this.state.completedItems;

		this.removeItemFromList(item, 'todo');
		this.addItemToList(item, listToAddTo, 'completed');
	},

	markItemTodoHandler: function(item) {
		var listToAddTo = this.state.todoItems,
			listToRemoveFrom = this.state.completedItems;

		
	},

	handleSubmit: function(event) {
	    var newItem = {id: this.state.count, value: event.target.value};
	    if( event.keyCode == 13 ) {
	        var list = this.state.todoItems;
	        list.push(newItem);
	        this.setState({todoItems: list, count: this.state.count + 1});
	        event.target.value = '';
	        this.transitionTo('todo');
	    }
    },

    showEditItemTexbox: function() {
    	this.setState({showInput: true});
    },

    hideEditItemTextbox: function() {
    	this.setState({showInput: false});
    },

    editItemSubmitHandler: function(item, listName) {

	    var list = this.state[listName+'Items'];

		for(var i = 0; i < list.length; i++) {
		    var obj = list[i];
		    if(list[i].id == item.id) {
		        list[i].value = event.target.value;
		    }
		}

		if (listName === 'todo') {
			this.setState({todoItems: list});
		} else {
			this.setState({completedItems: list});
		}

    	if(event.keyCode === 13) {
    		this.hideEditItemTextbox();
    	}

    },

	render: function() {
		return (
			<div>
				<input
					name="add-todo"
					className="text-box"
					placeholder="What needs to be done?"
					onKeyDown={this.handleSubmit}
					autoComplete="off"  />

				<RouteHandler todoList={this.state.todoItems}
				    completedList={this.state.completedItems}
				    onDeleteAll={this.deleteAllHandler}
				    onDeleteItem={this.deleteItemHandler}
				    onEditItem={this.showEditItemTexbox}
				    onEditItemSubmit={this.editItemSubmitHandler}
				    onChangeItemList={this.changeItemListHandler} 
				    showInput={this.state.showInput} />

			</div>
		);
	}
});

module.exports = Home;