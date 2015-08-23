var mongoose = require('mongoose');

var BingoBoardSchema = new mongoose.Schema({
	title: String,
	ip: String,
	squares: [{
		label: String,
		active: Boolean
	}],
	created_at: Date,
	updated_at: Date,
	archived: Boolean
});

BingoBoardSchema.pre('save', function(next) {
	var currentDate = new Date();

	this.updated_at = currentDate;

	if (!this.created_at)
		this.created_at = currentDate;

	next();
});

module.exports = mongoose.model('BingoBoard', BingoBoardSchema);