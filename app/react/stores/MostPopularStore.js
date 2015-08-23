var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/MostPopularConstants');
var _ = require('underscore');

var _results = [];
var _showLoadMoreButton = true;
var _isLoading = false;
var _limit = 10;

function addMoreResults(results) {
	if (results.length === 0 || results.length < _limit)
		_showLoadMoreButton = false;

	_.each(results, function(r){
		_results.push(r);
	})
}

var MostPopularStore = _.extend({}, EventEmitter.prototype, {
	setResults: function(results) {
		_results = results;
	},

	getResults: function() {
		return _results;
	},

	shouldShowLoadMoreButton: function() {
		return _showLoadMoreButton;
	},

	getIsLoading: function() {
		return _isLoading;
	},

	emitChange: function() {
		console.log('change emitted');
		this.emit('change');
	},

	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}

});

AppDispatcher.register(function(payload) {
	var action = payload.action
	console.log('search store acction', payload);
	switch(action.actionType) {
		case Constants.LOAD_MORE_RESULTS:
			_isLoading = true;
			break;

		case Constants.LOAD_MORE_RESULTS_FAIL:
			_isLoading = false;
			break;

		case Constants.LOAD_MORE_RESULTS_SUCCESS:
			addMoreResults(action.results);
			_isLoading = false;
			break;

		default:
			return true;
	}

	console.log('emitting change');
	MostPopularStore.emitChange();

	return true;
});

module.exports = MostPopularStore;