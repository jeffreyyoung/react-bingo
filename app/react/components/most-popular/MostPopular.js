var React = require('react');
var MostPopularStore = require('./../../stores/MostPopularStore')
var LoadMoreButton = require('./LoadMoreButton')
var ResultsTable = require('./ResultsTable')
var MostPopular = React.createClass({
  getInitialState: function() {
    return {
      results: MostPopularStore.getResults(),
      showLoadMoreButton: MostPopularStore.shouldShowLoadMoreButton(),
      isLoading: MostPopularStore.getIsLoading(),
    }
  },

  componentDidMount: function(){
    MostPopularStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    MostPopularStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log('change!!!!!!!!')
    this.setState({
      results: MostPopularStore.getResults(),
      showLoadMoreButton: MostPopularStore.shouldShowLoadMoreButton(),
      isLoading: MostPopularStore.getIsLoading()
    });
  },

  render: function(){
    var button = (<span />);

    if (this.state.showLoadMoreButton){
      button = (<LoadMoreButton isLoading={this.state.isLoading}/>)
    }
    
    return (
      <div>
        <ResultsTable results={this.state.results} />
        {button}
      </div>
    )
  }
});

module.exports = MostPopular