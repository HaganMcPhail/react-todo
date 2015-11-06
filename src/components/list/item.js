"use strict";

var React = require('react');
var Lodash = require('lodash');
var Router = require('react-router');
var Link = Router.Link;

var Item = React.createClass({

	editItemSubmit: function(item, itemType) {
		this.props.onEditItemSubmit(item, itemType);
	},

	deleteItem: function(item, itemType) {
		this.props.onDeleteItem(item, itemType);
	},

	editItem: function(item) {
		this.props.onEditItem(item);
	},

	changeItemList: function(item, itemType) {
		this.props.onChangeItemList(item, itemType);
	},

	test: function() {alert('test')},

	render: function() {
		var self = this;
		return (
        	<div className="item" key={this.props.item.id}>
        		<span className={'glyphicon glyphicon-'+ this.props.addItemIcon + ' check icon'}
        			onClick={self.changeItemList.bind(null, this.props.item, this.props.itemType)}></span>
        		&nbsp;
        		<span className="glyphicon glyphicon-pencil pencil icon"
        			onClick={self.editItem.bind(null, this.props.item)}></span>
        		<span className="itemValue">
	        		{
	        			this.props.showInput ? <input className={'editText ' + this.props.item.id} type="text" placeholder="Edit Item" defaultValue={this.props.item.value} 
	        				autoComplete="off" onKeyDown={self.editItemSubmit.bind(null, this.props.item, this.props.itemType)}
	        				onBlur={self.editItemSubmit.bind(null, this.props.item, this.props.itemType)} /> : 
	        				<span className={'listItem ' + this.props.item.id}>{this.props.item.value}</span>
	        		}
				</span>
        		<span className="glyphicon glyphicon-trash delete icon" 
        			onClick={self.deleteItem.bind(null, this.props.item, this.props.itemType)}></span>
        	</div>
		);
	}
});

module.exports = Item;