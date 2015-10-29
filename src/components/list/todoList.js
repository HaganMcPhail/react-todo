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
		            		<span className="glyphicon glyphicon-check check icon"
		            			onClick={self.props.onMarkCompleted.bind(self, item)}></span>
		            		&nbsp;
		            		<span className="glyphicon glyphicon-pencil pencil icon"
		            			onClick={self.props.onEditItem.bind(self, item)}></span>
		            		<span className="itemValue">
		            			<span className={'listItem ' + item.id}>{item.value}</span>
		            			<input className={'editText ' + item.id} onKeyDown={self.props.onEditItem} type="text" placeholder="Edit Item" style={{display: 'none'}} defaultValue={item.value}/>
		            		</span>
		            		<span className="glyphicon glyphicon-trash delete icon" onClick={self.props.onDeleteItem.bind(null, item, 'todo')}></span>
		            	</div>
		            )
		          })
			    }
			    <div className="item">
            		<span className="itemValue"><span className="all-items"></span></span>
            		<span title="delete all todo items" className="glyphicon glyphicon-remove delete icon" onClick={this.props.onDeleteAll.bind(null, 'todo')}></span>
            	</div>
			</div>
		);
	}
});

module.exports = TodoList;