var React = require('react')
var Square = require('./Square.js')
var BingoStore = require('./../../stores/BingoBoardStore')

var BingoBoard = React.createClass({
  
  getInitialState: function() {
    BingoStore.setSquares(this.props.squares);
    BingoStore.setTitle(this.props.title);
    return {
      squares: BingoStore.getSquares(),
      title: BingoStore.getTitle()
    }
  },

  componentDidMount: function(){
    BingoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    BingoStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      squares: BingoStore.getSquares(),
      title: BingoStore.getTitle()
    });
  },

  render: function(){
    var squareNodes = this.state.squares.map(function(square, i){
      return (
        <Square squareData={square} index={i}/>
      )
    });
    return (
      <div>
        <h1>{this.state.title}</h1>
        <div className='bingo-board'>
          {squareNodes}
        </div>
      </div>
    )
  }
});

module.exports = BingoBoard