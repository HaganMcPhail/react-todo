"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Footer = React.createClass({
	render: function() {
		return (
			<footer>
				<div className="text-center">
					<Link to="todo">
						<button className="btn btn-default pagesBtn">
							ToDo
						</button>
					</Link>
					<Link to="completed">
						<button className="btn btn-default pagesBtn">
							Completed
						</button>
					</Link>
				</div>
			</footer>
		);
	}
});

module.exports = Footer;