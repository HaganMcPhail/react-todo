/*eslint-disable strict */ //disabling lint on this page bacause we need a global variable

var React = require('react');
var Header = require('./common/header');
var Footer = require('./common/footer');
var Home = require('./homePage');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<div className="content list">
					<Home />
				</div>
				<Footer />
			</div>
		);
	}
});

module.exports = App;