var React = require('react');
var Actions = require('./../../actions/SearchActions')
var Button = require('react-bootstrap/lib/Button')

var LoadMoreButton = React.createClass({
  getInitialState: function() {
    return {
      isLoading: this.props.isLoading,
      page: this.props.page,
      query: this.props.query
    }
  },

  loadMore: function(){
    Actions.loadMore(this.state.query, this.state.page + 1);
    Actions.setPage(this.state.page + 1);
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      isLoading: props.isLoading,
      page: this.state.page,
      query: this.props.query
    })
  },

  render: function(){
    if (this.state.isLoading)
    {
      return (
        <Button
          onClick={this.loadMore}
          block
          bsStyle='primary'
          disabled
          bsSize='large'>
          Load More
        </Button>
      )
    }
    else{
      return (
        <Button
          onClick={this.loadMore}
          block
          bsStyle='primary'
          bsSize='large'>
          Load More
        </Button>
      )
    }
  }
});

module.exports = LoadMoreButton