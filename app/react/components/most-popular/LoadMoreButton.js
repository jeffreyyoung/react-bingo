var React = require('react');
var MostPopularActions = require('./../../actions/MostPopularActions')
var Button = require('react-bootstrap/lib/Button')

var LoadMoreButton = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false,
      page: 0
    }
  },

  componentDidMount: function(){
    MostPopularActions.loadMore(this.state.page);
  },

  loadMore: function(){
    this.state.page++;
    this.setState({
      isLoading: this.state.isLoading,
      page: this.state.page
    })

    MostPopularActions.loadMore(this.state.page);
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      isLoading: props.isLoading,
      page: this.state.page
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