var BingoBoard = require('./CreateBingoForm.js')
var React = require('react')
console.log('here!!!!');
console.log(document.getElementById('data').innerHTML);
var data = JSON.parse(document.getElementById('data').innerHTML);
console.log(data);
React.render(
    <BingoBoard squares={data.squares} title={data.title}/>,
    document.getElementById('create-form')
);
