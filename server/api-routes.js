var express = require('express');
var router = express.Router();
var BingoBoard = require('./schema/BingoBoard');

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());
router.get('/mostpopular', function(req, res) {
	var page = 0;
	var limit = 10;

	if (req.query.page)
		page = req.query.page

	BingoBoard
		.find()
		.sort({updated_at: -1})
		.limit(limit)
		.skip(limit * page)
		.exec(function(err, doc){
			if (err)
				res.status(400).json(err)
			else
				res.json(doc)
		})
})

router.get('/search', function(req, res){
	//res.json(decodeURIComponent(req.query.q));
	var page = 0;
	var query = '';
	var limit = 10;

	if (req.query.page)
		page = req.query.page
	if (req.query.q)
		query = decodeURIComponent(req.query.q)
	if (req.query.limit)
		limit = req.query.limit;

	var regex = new RegExp(query, "i");

	BingoBoard
		.find({title: regex})
		.sort({updated_at: -1})
		.limit(limit)
		.skip(limit * page)
		.exec(function(err, doc){
			if (err)
				res.status(400).json(err)
			else {
				res.json(doc);
			}
		})

})

router.get('/list', function(req, res){
	var page = 0;
	var sortBy = false;
	var limit = 10;
	var ascending = -1;

	if (req.query.page)
		page = req.query.page
	if (req.query.sortBy)
		sortBy = req.query.sort
	if (req.query.limit)
		limit = req.query.limit
	if (req.query.descending == 'true')
		ascending = 1;

	BingoBoard
		.find()
		.sort({updated_at: ascending})
		.limit(limit)
		.skip(limit * page)
		.exec(function(err, doc) {
			if (err)
				res.status(400).json(err)
			else
				res.json(doc)
		})
})

router.get('/', function(req, res){
	BingoBoard.find({}, function(err, boards){
		if (err) throw err;

		res.json(boards);
	})
});

router.post('/', function(req, res){

	if (!validateBody(req.body)){
		res.sendStatus(400);
	}
	else {
		var newBB = new BingoBoard({
			title: req.body.title,
			squares: req.body.squares,
			ip_address: req.ip,
			archived: false
		});

		newBB.save(function(err, other){
			if (err) throw err;

			res.json(other);
		})
	}
});

router.put('/:id', function(req, res){
	if (!validateBody(req.body)){
		res.sendStatus(400);
	}
	else {
		BingoBoard.findOne({_id: req.params.id}, function(err, doc){
			if (err) {
				res.json(err);
			}
			else
			{
				doc.title = req.body.title;
				doc.squares = req.body.squares;
				doc.save();
				res.json(doc);
			}
		})
	}
})

router.get('/:id', function(req, res){
	BingoBoard.findById(req.params.id, function(err, data){
		if (err) throw err;

		res.json(data);
	})
})


function validateBody(body) {
	console.log(body);
	console.log('body!!!', body.squares, typeof body.squares);
	if (!body){
		console.log('here 1');
		return false;
	}
	else if (!body.title) {
		console.log('ere 2');
		return false;
	}
	else if (!body.squares && body.squares.length < 24) {
		console.log('here 3')
		return false;
	}
	else {
		console.log('here 4');

		return true;
	}
}
// router.put('/:id', function(req, res){

// })

// router.delete('/:id', function(req, res){

// })

module.exports = router;