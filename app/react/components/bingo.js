var React = require('react');
var Layout = require('./layout/Layout');
var BingoBoard = require('./bingo/BingoBoard');

var Index = React.createClass({
  render: function() {
    return (
      <Layout title={this.props.title} scripts={this.props.scripts} styles={this.props.styles} data={this.props.data}>
        <div id='bingo-board'>
          <BingoBoard squares={this.props.squares} title={this.props.title}/>
        </div>
      </Layout>
    );
  }
});

module.exports = Index;