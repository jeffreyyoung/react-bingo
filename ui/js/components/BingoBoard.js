var React = require('react')
var Square = require('./Square.js')

var BingoBoard = React.createClass({
  getInitialState: function() {
    return {
      squares: this.props.squares
    }
  },

  render: function(){
    var squareNodes = this.state.squares.map(function(square){
      return (
        <Square label={square}/>
      )
    });
    return (
      <div>
        {squareNodes}
      </div>
    )
  }
});

module.exports = BingoBoard