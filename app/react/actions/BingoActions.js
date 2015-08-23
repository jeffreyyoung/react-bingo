var AppDispatcher = require('../dispatcher/AppDispatcher');
var BingoConstants = require('../constants/BingoConstants');
var BingoClient = require('../utils/BingoAPI');

var BingoActions = {

	setSquareActive: function(index, active) {
		AppDispatcher.handleAction({
			actionType: BingoConstants.SQUARE_SET_ACTIVE,
			index: index,
			active: active
		})
	},

	updateSquareLabel: function(index, label) {
		AppDispatcher.handleAction({
			actionType: BingoConstants.SQUARE_SET_LABEL,
			index: index,
			label: label
		})
	},

	updateBingoTitle: function(title) {
		AppDispatcher.handleAction({
			actionType: BingoConstants.BINGO_SET_TITLE,
			title: title
		})
	},

	search: function(query, page) {
		AppDispatcher.handleAction({
			actionType: BingoConstants.LOAD_SEARCH_RESULTS
		});

		BingoClient.search(query, page)
			.then(function(response){
				console.log('success!!!', response)

				AppDispatcher.handleAction({
					actionType: BingoConstants.LOAD_SEARCH_RESULTS_SUCCESS,
					results: response.data
				});
			})
			.catch(function(response){
				console.log(response)
			})
	},

	setSearchQuery: function(query) {
		AppDispatcher.handleAction({
			actionType: BingoConstants.SEARCH_SET_QUERY,
			query: query
		})
	}
}

module.exports = BingoActions;