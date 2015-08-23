var React = require('react');
var Layout = require('./layout/Layout');
var MostPopular = require('./most-popular/MostPopular');

var Index = React.createClass({
  render: function() {
    return (
      <Layout title={this.props.title} scripts={this.props.scripts} styles={this.props.styles} data={this.props.data}>
        <div id='mount'>
          <MostPopular />
        </div>
      </Layout>
    );
  }
});

module.exports = Index;