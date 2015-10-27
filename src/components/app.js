/*eslint-disable strict */ //disabling lint on this page bacause we need a global variable

var React = require('react');
var Header = require('./common/header');
var Home = require('./homePage');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('jquery');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<div className="content list">
					<Home />
				</div>
			</div>
		);
	}
});

module.exports = App;