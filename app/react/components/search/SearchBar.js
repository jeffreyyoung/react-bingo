var React = require('react')
var Input = require('react-bootstrap/lib/Input')
var Button = require('react-bootstrap/lib/Button')
var Glyphicon = require('react-bootstrap/lib/Glyphicon')
var Actions = require('./../../actions/SearchActions')


var SearchBar = React.createClass({
  getInitialState: function() {
    return {
      query: this.props.query,
      inputValue: this.props.query
    }
  },

  handleChange: function(event) {
    this.setState({
      query: this.props.query,
      inputValue: event.target.value
    })
  },

  willRecieveProps: function() {
    this.setState({
      query: this.props.query,
      inputValue: this.state.inputValue
    })
  },

  search: function() {
    if(this.state.inputValue != this.state.query){
      Actions.setQuery(this.state.inputValue);
      Actions.setPage(0);
      Actions.loadMore(this.state.inputValue, 0)
    }
  },

  render: function(){
    var searchButton = (<Button onClick={this.search} onChange={this.handleChange} bsStyle='primary' bsSize='large'><Glyphicon glyph='search'/></Button>)
    return (
      <Input 
        type='text' 
        bsSize='large' 
        placeholder='Search...'
        value={this.state.input} 
        onChange={this.handleChange} 
        buttonAfter={searchButton}/>
    )
  }
});

module.exports = SearchBar