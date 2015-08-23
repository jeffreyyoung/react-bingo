var React = require('react');
var SearchBar = require('./SearchBar')
var ResultsTable = require('./../most-popular/ResultsTable')
var Store = require('./../../stores/SearchStore')
var LoadMoreButton = require('./LoadMoreButton')

var Search = React.createClass({
  getInitialState: function() {
    return {
      query: Store.getQuery(),
      results: Store.getResults(),
      page: Store.getPage(),
      showLoadMoreButton: Store.shouldShowLoadMoreButton(),
      isLoading: Store.getIsLoading()
    }
  },


  componentDidMount: function(){
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    Store.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    
    this.setState({
      query: Store.getQuery(),
      results: Store.getResults(),
      page: Store.getPage(),
      showLoadMoreButton: Store.shouldShowLoadMoreButton(),
      isLoading: Store.getIsLoading()
    });
    console.log('on change!!!!', this.state);
  },

  render: function(){
    var button = (<span />)
    if (this.state.showLoadMoreButton){
      button = (<LoadMoreButton query={this.state.query} page={this.state.page} isLoading={this.state.isLoading}/>)
    }

    var info = (<span />)
    var  word = 'results';
    if (this.state.results.length < 2)
      word = 'result';
    if (this.state.query)
    {
      info = (<p>Showing {this.state.results.length} {word} for "{this.state.query}"</p>)
    }

    return (
      <div>
        <SearchBar query={this.state.query} />
        <br />
        {info}
        <ResultsTable results={this.state.results} />
        {button}
      </div>
    )
  }
});

module.exports = Search