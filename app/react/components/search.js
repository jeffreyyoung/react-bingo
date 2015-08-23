var React = require('react');
var Layout = require('./layout/Layout');
var Search = require('./search/Search');

var Index = React.createClass({
  render: function() {
    return (
      <Layout title={this.props.title} scripts={this.props.scripts} styles={this.props.styles} data={this.props.data}>
        <div id='search-mount'>
          <Search />
        </div>
      </Layout>
    );
  }
});

module.exports = Index;