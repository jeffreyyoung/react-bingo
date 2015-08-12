var BingoBoard = require('./components/BingoBoard.js')
var React = require('react')

var bingoData = ['Apples', 'Oranges', 'Cactus', 'Green'];

React.render(
    <BingoBoard squares={bingoData}/>,
    document.getElementById('bingo-board')
);
