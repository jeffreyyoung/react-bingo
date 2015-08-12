var React = require('react/addons'),
	ReactApp = React.createFactory(require('../../ui/js/components/BingoBoard')),
	express = require('express'),
	router = express.Router();

router.get('/', function(req, res){
	// React.renderToString takes your component
    // and generates the markup
	var reactHtml = React.renderToString(ReactApp({
		squares: ['a','b', 'c']
	}));

	console.log(reactHtml);
    // Output html rendered by react
	// console.log(myAppHtml);
    res.render('index.ejs', {reactOutput: reactHtml});
});

module.exports = router;