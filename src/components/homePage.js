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
			todoItems: [
				{
					'id':0,
					'value': 'test'
				},
				{
					'id':1,
					'value': 'test2'
				}
			],
			completedItems: [],
			count: 2
		};
	},

	//reusable remove and add functions
	// *****************************************************************************************************************/
	removeItemFromList: function(itemToRemove, listToRemoveFrom, list) {
		var removeList = listToRemoveFrom;
		removeList.splice($.inArray(itemToRemove, removeList),1);
		if (list === 'todo') {
			this.setState({todoItems: removeList});
		} else {
			this.setState({completedItems: removeList});
			console.log(this.state.completedItems);
		}

		// for(var i = 0; i < removeList.length; i++) {
		//     var obj = removeList[i];

		//     if(itemToRemove.id == obj.id) {
		//         removeList.splice(i, 1);
		//         if (list === 'todo') {
		//         	// console.log(listToRemoveFrom);
		// 			this.setState({todoItems: removeList});
		// 		} else {
		// 			this.setState({completedItems: removeList});
		// 			console.log(this.state.completedItems);
		// 		}
		//     }
		// }
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
	// Delete Functions
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

    showEditItemTexbox: function(item) {
    	$('span.listItem.'+item.id).hide();
	    $('.editText.'+item.id).show().focus();
    },

    hideEditItemTextbox: function() {
    	$('span.listItem').show();
		$('.editText').hide().blur();
    },

    editItemSubmitHandler: function(item, list) {
	    
	    this.showEditItemTexbox(item);

	    if( event.keyCode == 13 ) {
			for(var i = 0; i < list.length; i++) {
			    var obj = list[i];
			    if(list[i].id == item.id) {
			        list[i].value = $('.editText.'+item.id).val();
			    }
			}

	    	this.setState({todoItems: list});
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
				    onMarkCompleted={this.markItemCompletedHandler}
				    onMarkTodo={this.markItemTodoHandler}
				    onEditItem={this.showEditItemTexbox}
				    onEditItemSubmit={this.editItemSubmitHandler} />

			</div>
		);
	}
});

module.exports = Home;