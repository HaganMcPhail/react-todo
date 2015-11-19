"use strict";

var React = require('react');
var Router = require('react-router');
var Item = require('../list/item.js');
var DeleteAll = require('../list/deleteAll.js');
var Link = Router.Link;

var TodoList = React.createClass({

	render: function() {
		var self = this,
		items = [];

		this.props.completedList.forEach(function(item) {
			items.push(<Item key={item.id} item={item}
					itemType="completed"
					addItemIcon="check"
					todoList={this.props.todoList}
				    completedList={this.props.completedList}
				    onDeleteItem={this.props.onDeleteItem}
				    onEditItem={this.props.onEditItem}
				    onEditItemSubmit={this.props.onEditItemSubmit}
				    onChangeItemList={this.props.onChangeItemList}
				    showInput={this.props.showInput} />);
		}.bind(this));

		return (
			<div>
				{items}
			    { this.props.showDeleteAllCompleted ? <DeleteAll itemType="completed" onDeleteAll={this.props.onDeleteAll} /> : null }
			</div>
		);
	}
});

module.exports = TodoList;