"use strict";

var React = require('react');
var Router = require('react-router');
var Item = require('../list/item.js');
var Link = Router.Link;

var DeleteAll = React.createClass({

	deleteAll: function() {
		this.props.onDeleteAll(this.props.itemType);
	},

	render: function() {
		return (
		    <div className="item">
        		<span className="itemValue"><span className="all-items"></span></span>
        		<span title="delete all items" className="glyphicon glyphicon-remove delete icon" 
        			onClick={this.deleteAll}></span>
        	</div>
		);
	}
});

module.exports = DeleteAll;