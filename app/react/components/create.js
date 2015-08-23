var React = require('react');
var Layout = require('./layout/Layout');
var CreateForm = require('./create/CreateBingoForm');

var Index = React.createClass({
  render: function() {
    return (
      <Layout title={this.props.title} scripts={this.props.scripts} styles={this.props.styles} data={this.props.data}>
        <div id='create-form'>
          <CreateForm squares={this.props.squares} title={this.props.title}/>
        </div>
      </Layout>
    );
  }
});

module.exports = Index;