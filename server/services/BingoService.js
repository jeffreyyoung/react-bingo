var BingoBoard = require('./../schema/BingoBoard');

var service = {

	create: function(title, ip, squares, callback) {
		var bb = new BingoBoard({
			title: title,
			ip_address: ip,
			squares: squares
		});

		return bb.save(callback);
	},
	
	findById: function(id, callback) {
		return BingoBoard.findById(id, callback);
	},

	findAll: function(callback) {
		return BingoBoard.find({}, callback);
	}

}

module.exports = service;