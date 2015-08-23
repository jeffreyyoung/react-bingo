var express = require('express');
var router = express.Router();
var BingoBoard = require('./schema/BingoBoard');

router.get('/', function(req, res){
	console.log('here1111')
	res.render('most-popular', {
		title: 'Most Popular',
		scripts: ['/app/react/components/most-popular/main.bundle.js'],
		styles: ['/css/bingo.css']
	})
})
router.get('/search', function(req, res){
	console.log('here1111')
	res.render('search', {
		title: 'Search',
		scripts: ['/app/react/components/search/main.bundle.js'],
		styles: ['/css/bingo.css']
	})
})

router.get('/create', function(req, res){

	var board = generateNewBoardData();
	console.log(board);
	res.render('create', {
		title: board.title,
		squares: board.squares,
		data: JSON.stringify(board),
		scripts: ['/app/react/components/create/main.bundle.js'],
		styles: ['/css/create.css']
	});
})

router.get('/:bingoID/:slug', function(req, res){
	console.log('here22222')
	BingoBoard.findById(req.params.bingoID, function(err, board){
		if (err || !board) {
			res.status(400).json(err);
		}

		res.render('bingo', {
			title: board.title || board.name || '',
			squares: board.squares,
			data: JSON.stringify(board),
			scripts: ['/app/react/components/bingo/main.bundle.js'],
			styles: ['/css/bingo.css']
		});
	});
})

function generateNewBoardData(){
	var squares = [];

	for (var i = 0; i < 25; i++){
		squares.push({
			label: '',
			valid: false
		})
	}

	var board = {
		"title": "",
		"squares": squares
	};

	return board;
}

module.exports = router;