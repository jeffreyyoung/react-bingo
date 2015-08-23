var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var Glyphicon = ReactBootstrap.Glyphicon;
var CollapsibleNav = ReactBootstrap.CollapsibleNav

var BingoNav = React.createClass({
	render: function(){
		return (
		  <Navbar brand='Bingo!'>
		      <Nav navbar>
		      	<NavItem eventKey={1} href='/'><Glyphicon glyph='thumbs-up' /> Popular</NavItem>
				<NavItem eventKey={2} href='/search'><Glyphicon glyph='search' /> Find</NavItem>
				<NavItem eventKey={3} href='/create'><Glyphicon glyph='plus' /> Create</NavItem>
		      </Nav>
		  </Navbar>
		)
	}
})

module.exports = BingoNav;
