"use strict";

var React = require('react');
var Lodash = require('lodash');
var Router = require('react-router');
var Link = Router.Link;

var TodoList = React.createClass({

	render: function() {
		var self = this;
		return (
			<div>
				{
		          this.props.todoList.map(function(item, i) {
		            return (
		            	<div className="item" key={item.id}>
		            		<span className="glyphicon glyphicon-check check"
		            			onClick={self.props.onMarkCompleted.bind(self, item)}></span>
		            		<span className="itemValue">{item.value}</span>
		            		<span className="glyphicon glyphicon-trash delete" onClick={self.props.onDeleteItem.bind(null, item, 'todo')}></span>
		            	</div>
		            )
		          })
			    }
			    <div className="item">
            		<span className="itemValue"><span className="all-items"></span></span>
            		<span title="delete all todo items" className="glyphicon glyphicon-remove delete" onClick={this.props.onDeleteAll.bind(null, 'todo')}></span>
            	</div>
			</div>
		);
	}
});

module.exports = TodoList;