var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/SearchConstants');
var BingoClient = require('../utils/BingoAPI');

var BingoActions = {

	loadMore: function(query, page){
		
		AppDispatcher.handleAction({
			actionType: Constants.LOAD_MORE_RESULTS
		});

		BingoClient.search(query, page)
			.then(function(response){
				console.log('success!!!', response)
				AppDispatcher.handleAction({
					actionType: Constants.LOAD_MORE_RESULTS_SUCCESS,
					results: response.data
				});
			})
			.catch(function(err){
				console.log(err);
				AppDispatcher.handleAction({
					actionType: Constants.LOAD_MORE_RESULTS_FAIL,
					err: err
				});
			})
	},

	setQuery: function(query) {
		console.log('SETTING QUERY!!!!!', query)
		AppDispatcher.handleAction({
			actionType: Constants.SET_QUERY,
			query: query
		})
	},

	setPage: function(page) {
		AppDispatcher.handleAction({
			actionType: Constants.SET_PAGE,
			page: page
		})
	}
}

module.exports = BingoActions;