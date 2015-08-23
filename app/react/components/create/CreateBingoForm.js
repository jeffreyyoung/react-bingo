var React = require('react')
var Square = require('./SquareForm.js')
var Title = require('./TitleForm.js')
var BoardSaver = require('./BoardSaver.js')
var BingoStore = require('./../../stores/CreateBoardStore')

var CreateBingoForm = React.createClass({
  
  getInitialState: function() {
    BingoStore.init(this.props.title, this.props.squares);
    return {
      squares: BingoStore.getSquares(),
      title: BingoStore.getTitle(),
      validation: BingoStore.getValidation()
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
      title: BingoStore.getTitle(),
      validation: BingoStore.getValidation()
    });
  },

  render: function(){
    var squareNodes = this.state.squares.map(function(square, i){
      return (
        <Square squareData={square} index ={i}/>
      )
    });

    return (
      <div>
        <BoardSaver title={this.state.title} squares={this.state.squares} validation={this.state.validation} />
        <h1>{this.state.title}</h1>
        <Title title={this.state.title} />
        <div className='create-board'>
          {squareNodes}
        </div>
      </div>
    )
  }
});

module.exports = CreateBingoForm