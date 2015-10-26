"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var List = React.createClass({
	render: function() {
		return (
			<div>
				<div className="item">test</div>
				<div className="item">test</div>
				<div className="item">test</div>
				<div className="item">test</div>
			</div>
		);
	}
});

module.exports = List;