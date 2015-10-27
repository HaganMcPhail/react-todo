"use strict";

var React = require('react');
var Lodash = require('lodash');
var Router = require('react-router');
var Link = Router.Link;

var CompletedList = React.createClass({
	addItemToList: function(itemToAdd, listToAddTo) {
		listToAddTo.push(itemToAdd);
		this.setState({todoItems: listToAddTo});
		//console.log(this.state.completedItems);
	},

	removeItemFromList: function(itemToRemove, listToRemoveFrom) {
		for(var i = 0; i < listToRemoveFrom.length; i++) {
		    var obj = listToRemoveFrom[i];

		    if(itemToRemove.id == obj.id) {
		        listToRemoveFrom.splice(i, 1);
		        i--;
		        this.setState({completedItems: listToRemoveFrom});
		    }
		}
	},

	markItemTodo: function(item) {
		var listToAddTo = this.props.todoList,
			listToRemoveFrom = this.props.completedList;

		this.removeItemFromList(item, listToRemoveFrom);
		this.addItemToList(item, listToAddTo);
	},
	
	deleteItem: function(item) {
		var listToRemoveFrom = this.props.completedList;
		this.removeItemFromList(item, listToRemoveFrom);
	},

	render: function() {
		var self = this;
		return (
			<div>
				{
		          this.props.completedList.map(function(item, i) {
		            return (
		            	<div className="item" key={item.id}>
		            		<span className="glyphicon glyphicon-plus check"
		            			onClick={self.markItemTodo.bind(self, item)}></span>
		            		<span className="itemValue">{item.value}</span>
		            		<span className="glyphicon glyphicon-trash delete" onClick={self.deleteItem.bind(self, item)}></span>
		            	</div>
		            )
		          })
			    }
			    <div className="item">
            		<span className="glyphicon glyphicon-ok check"
            			onClick={self.markAllItemsCompleted}></span>
            		<span className="itemValue"><span className="all-items">All Items</span></span>
            		<span className="glyphicon glyphicon-remove delete" onClick={self.deleteAllItems}></span>
            	</div>
			</div>
		);
	}
});

module.exports = CompletedList;