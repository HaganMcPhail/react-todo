"use strict";

var React = require('react');

var Input = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		placeholder: React.PropTypes.string,
		value: React.PropTypes.string,
		error: React.PropTypes.string
	},

	render: function() {
		return (
			<input
				className="text-box"
				placeholder={this.props.placeholder}
				value={this.props.listItem}
				onKeyDown={this.add}
				autoFocus=''
				onKeyPress={this.props.onKeyDown} />
		);
	}
});

module.exports = Input;