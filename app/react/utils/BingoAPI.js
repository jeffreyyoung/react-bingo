var Promise = require('promise');
var rp = require('axios');

var promisesCache = {}

var BingoClient = {
	search: function(query, page){
		var url = '/api/bingo/search?q=' + encodeURI(query) +'&page=' + page;
		return rp.get(url);
		// if (!promisesCache[url])
		// {
		// 	promisesCache[url] = new Promise(function(resolve, reject){
		// 		rp.get(url).then(resolve).catch(reject);
		// 	})
		// }

		// return promisesCache[url];
	},

	getMostPopular: function(page){
		var url = '/api/bingo/mostpopular?page='+page;
		return rp.get(url);
	},

	cacheGET: function(url)
	{
		// if (cache.hasOwnProperty(url))
		// {
		// 	return Promise.resolve(cache[url]);
		// }
		// else
		// {
		// 	rp.get(url).then(function(data){
		// 		cache[url] = data;

		// 	});
		// }
	}
};

module.exports = BingoClient;