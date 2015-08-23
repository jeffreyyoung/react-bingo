var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BingoConstants = require('../constants/BingoConstants');
var _ = require('underscore');

var _squares = [];
var _title = '';
var _validation = {};
var _id = null;

function setLabel(index, label) {
	_squares[index].label = label;
	_validation = validate();
}

function setTitle(title) {
	_title = title;
	_validation = validate();
}

function validateTitle() {
	return _title.replace(/ /g, '').length > 4;
}

function getInvalids() {
	var invalids = 0;
	_.forEach(_squares, function(square){
		    var length = square.label.replace(/ /g, '').length;
    
		    if (length < 4) {
		    	invalids++;
		    }
	});
	return invalids;
}

function validate() {
	var validation = {};
	if (!validateTitle()) {
		validation.message = 'Enter a valid title';
		validation.valid = false;
		validation.id = _id;
		return validation;
	}

	var invalids = getInvalids();
	if (invalids > 0) {
		validation.message = 'Label ' + invalids + ' more bingo tiles';
		validation.valid = false;
		validation.id = _id;
		return validation;
	}

	validation.message = '';
	validation.valid = true;
	validation.id = _id;

	return validation;
}

var BingoBoardStore = _.extend({}, EventEmitter.prototype, {

	init: function(title, squares) {
		_title = title;
		_squares = squares;
		_validation = validate();
	},

	getSquares: function() {
		return _squares;
	},

	getTitle: function() {
		return _title;
	},

	getValidation: function() {
		return _validation;
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
	switch(action.actionType) {
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