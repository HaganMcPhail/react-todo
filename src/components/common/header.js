"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
	render: function() {
		return (
			<div>
				<div className="text-center">
					<div className="head">the list</div>
				</div>
			</div>
		);
	}
});

module.exports = Header;