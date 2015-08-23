var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BingoConstants = require('../constants/BingoConstants');
var _ = require('underscore');

var _squares = [];
var _title = '';

function setLabel(index, label) {
	_squares[index].label = label;
}

function setActive(index, active) {
	_squares[index].active = active;
}

function setTitle(title) {
	_title = title;
}

var BingoBoardStore = _.extend({}, EventEmitter.prototype, {

	setSquares: function(squares) {
		_squares = squares;
	},

	getSquares: function() {
		return _squares;
	},

	getSquareCount: function() {
		return _squares.length;
	},

	getTitle: function() {
		return _title;
	},

	setTitle: function(title) {
		_title = title;
	},

	emitChange: function() {
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
	var action = payload.action;
	console.log('ACTIONS!!!!!', action);
	switch(action.actionType) {

		case BingoConstants.SQUARE_SET_ACTIVE:
			setActive(action.index, action.active);
			break;

		case BingoConstants.SQUARE_SET_LABEL:
			setLabel(action.index, action.label);
			break;

		case BingoConstants.BINGO_SET_TITLE:
			setTitle(action.title);
			break;

		default:
			return true;
	}

	BingoBoardStore.emitChange();

	return true;
});

module.exports = BingoBoardStore;