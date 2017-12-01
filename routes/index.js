var express = require('express');
var router = express.Router();
var connection = require('../db');
var Promise = require('bluebird');

/* GET home page. */
router.get('/', function(req, res, next) {
	connection.select('id','name','status')
		.from('skills')
		.then(function(rows) {
			res.json(rows);
		})
		.catch(function(error) {
		  console.error(error)
		});
});

router.post('/skills', function(req, res, next) {
	var skill_name = req.body.name;
	var skill_status = req.body.status;
	return connection('skills').insert({name: skill_name, status : skill_status})
		.then(function(data){
			return connection.select('id','name','status')
			    .from('skills');
		}).then(function(rows) {
			  	res.json({ success : true,
			  		data: rows});
		}).catch(function(err){
			console.log(err);
			res.json({success : false,
					data: err});
		});

});

router.get('/search', function(req, res, next){	
	var query = req.query.search;
	if(query == null){
		return res.json({
			message : null
		});
	}
	connection.select('id','name','status')
		.from('skills')
		.where('name', 'like', '%'+ query +'%')
		.then(function(rows) {
			res.json(rows);
		})
		.catch(function(error) {
		  console.error(error)
		});
});

router.put('/skills/:id/update', function(req, res, next){
	var name = req.body.name;
	var id = req.params.id;
	if(name != null){ 
		connection('skills')
			.where('id', '=', id)
			.update({
			  name: name,
			  thisKeyIsSkipped: undefined
			}).then(function(data){
				res.json({success : true});
			}).catch(function(err){console.error(err)})
	}
})

router.put('/skills/:id/approve', function(req, res, next){		
	var status = req.body.status;
	var id = req.params.id;
	connection('skills')
			.where('id', '=', id)
			.update({
			  status: status,
			  thisKeyIsSkipped: undefined
			}).then(function(data){
				res.json({success : true});
			}).catch(function(err){console.error(err)})
});
module.exports = router;
