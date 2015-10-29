"use strict";

var React = require('react');
var Lodash = require('lodash');
var Router = require('react-router');
var Link = Router.Link;

var CompletedList = React.createClass({
	
	render: function() {
		var self = this;
		return (
			<div>
				{
		          this.props.completedList.map(function(item, i) {
		            return (
		            	<div className="item" key={item.id}>
		            		<span className="glyphicon glyphicon-plus check icon"
		            			onClick={self.props.onMarkTodo.bind(self, item)}></span>
		            		<span className="itemValue">{item.value}</span>
		            		<span className="glyphicon glyphicon-trash delete icon" onClick={self.props.onDeleteItem.bind(null, item, 'completed')}></span>
		            	</div>
		            )
		          })
			    }
			    <div className="item">
            		<span className="itemValue"><span className="all-items"></span></span>
            		<span title="delete all completed items" className="glyphicon glyphicon-remove delete icon" onClick={self.props.onDeleteAll.bind(null, 'completed')}></span>
            	</div>
			</div>
		);
	}
});

module.exports = CompletedList;