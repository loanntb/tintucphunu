const Event = require("../models/event.model");


module.exports.getEvent = function(req, res) {
	Event.getAll(function(err,rows){
	  if(err){
		let data = {
			error: "Xin lỗi! Có lỗi xảy ra"
		}
		res.render("admin", { data: data });
	} else {
	  let data = {
		  title:'',  
		  events: rows,
		}
		res.render("admin/sukien/danhsach", { data: data });
	  }
	});
  };

module.exports.postNewEvent = function (req, res,err) {
	event = {
        event_name:req.body.event_name
	};
	let results = Event.add(event);
	if(results){
		res.redirect("/admin/sukien/danhsach")
	}else{
		res.json(err)
	}
}; 

module.exports.editEvent = function (req, res, next) {
	Event.updated(req.params.id, req.body.event_name, function (err, rows) {
        if (err) {
			res.json(err);
        } else {
			
			res.redirect("/admin/sukien/danhsach");
        }
    });
}

module.exports.deleteEvent = function(req, res){
	let data_db = Event.deleteEvent(req.params.id);
	if (!data_db){
		res.json({
			code: 500,
			message: "Error DB"
		});
	}else{
		res.redirect("/admin/sukien/danhsach")
				
	}		
}
