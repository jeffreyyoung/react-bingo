var BingoBoard = require('./BingoBoard.js')
var React = require('react')

var data = JSON.parse(document.getElementById('data').innerHTML);

React.render(
    <BingoBoard squares={data.squares} title={data.title}/>,
    document.getElementById('bingo-board')
);
