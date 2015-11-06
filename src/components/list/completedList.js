"use strict";

var React = require('react');
var Router = require('react-router');
var Item = require('../list/item.js');
var Link = Router.Link;

var TodoList = React.createClass({

	deleteAll: function() {
		this.props.onDeleteAll('completed');
	},

	render: function() {
		var self = this,
		items = [];

		this.props.completedList.forEach(function(item) {
			items.push(<Item key={item.id} item={item}
					itemType="completed"
					addItemIcon="check"
					todoList={this.props.todoItems}
				    completedList={this.props.completedItems}
				    onDeleteItem={this.props.onDeleteItem}
				    onEditItem={this.props.onEditItem}
				    onEditItemSubmit={this.props.onEditItemSubmit}
				    onChangeItemList={this.props.onChangeItemList}
				    showInput={this.props.showInput} />);
		}.bind(this));

		return (
			<div>
				{items}
			    <div className="item">
            		<span className="itemValue"><span className="all-items"></span></span>
            		<span title="delete all completed items" className="glyphicon glyphicon-remove delete icon" 
            			onClick={this.deleteAll}></span>
            	</div>
			</div>
		);
	}
});

module.exports = TodoList;