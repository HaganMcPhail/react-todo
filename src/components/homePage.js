"use strict";

var React = require('react');
var Router = require('react-router');
var List = require('./list/todoList');
var Link = Router.Link;

var Home = React.createClass({
	getInitialState: function() {
		return {
			todoItems: [],
			completedItems: []
		};
	},

    handleSubmit: function(e) {
        var toDoItem = event.target.value;
        if( e.keyCode == 13 ) {
            var list = this.state.todoItems;
            list.push(toDoItem);
            this.setState({todoItems: list});
            event.target.value = '';
            console.log(this.state.todoItems);
        }

    },

	render: function() {
		return (
			<div className="content">
				<input
					name="add-todo"
					className="text-box"
					placeholder="What needs to be done?"
					value={this.value}
					onKeyDown={this.handleSubmit} />
				<List items={this.state.todoItems} />
			</div>
		);
	}
});

module.exports = Home;