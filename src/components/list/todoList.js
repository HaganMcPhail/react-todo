"use strict";

var React = require('react');
var Lodash = require('lodash');
var Router = require('react-router');
var Link = Router.Link;

var TodoList = React.createClass({
	addItemToList: function(itemToAdd, listToAddTo) {
		listToAddTo.push(itemToAdd);
		this.setState({completedItems: listToAddTo});
		//console.log(this.state.completedItems);
	},

	removeItemFromList: function(itemToRemove, listToRemoveFrom) {
		for(var i = 0; i < listToRemoveFrom.length; i++) {
		    var obj = listToRemoveFrom[i];

		    if(itemToRemove.id == obj.id) {
		        listToRemoveFrom.splice(i, 1);
		        i--;
		        this.setState({todoItems: listToRemoveFrom});
		    }
		}
	},

	markItemCompleted: function(item) {
		var listToRemoveFrom = this.props.todoList,
			listToAddTo = this.props.completedList;

		this.removeItemFromList(item, listToRemoveFrom);
		this.addItemToList(item, listToAddTo);
		console.log(this.state);
	},
	
	deleteItem: function(item) {
		console.log(this.state.count);
		var listToRemoveFrom = this.props.todoList;
		this.removeItemFromList(item, listToRemoveFrom);
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
		            			onClick={self.markItemCompleted.bind(self, item)}></span>
		            		<span className="itemValue">{item.id} {item.value}</span>
		            		<span className="glyphicon glyphicon-trash delete" onClick={self.deleteItem.bind(self, item)}></span>
		            	</div>
		            )
		          })
			    }
			</div>
		);
	}
});

module.exports = TodoList;