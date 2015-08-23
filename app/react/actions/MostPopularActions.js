var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/MostPopularConstants');
var BingoClient = require('../utils/BingoAPI');

var BingoActions = {

	loadMore: function(page){
		BingoClient.getMostPopular(page)
		AppDispatcher.handleAction({
			actionType: Constants.LOAD_MORE_RESULTS
		});

		BingoClient.getMostPopular(page)
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
	}
}

module.exports = BingoActions;