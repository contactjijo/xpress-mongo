var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postsSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}

}, { versionKey: false });

module.exports = mongoose.model('posts', postsSchema);
