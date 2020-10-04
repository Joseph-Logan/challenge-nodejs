const mongoose = require('mongoose')

const Logs = mongoose.Schema({
  action : {
		type: String,
		required: true
	},
	methods_used: {
		type: String,
		required: true
	},
	type_process: {
		type: String,
		enum: [
			'Processing', 
			'Done', 
			'Failed'
		],
		required: true
	},
	executed_by: {
		type: String,
		required: true
	},
	executed_at: {
		type: Date,
		default: new Date()
	}
})


module.exports = mongoose.model('Log', Logs) 