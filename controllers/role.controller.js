const role = require("../models/role.model");


module.exports.getRole = function(req, res) {
	role.getAll(function(err,rows){
	  if(err){
		res.json(err);
	} else {
	  let data = {
		  title:'',  
		  roles: rows,
		}
		res.render("admin/role/danhsach", { data: data });
	  }
	});
  };

module.exports.postNewRole = function (req, res,err) {
	roleP = {
        role_name:req.body.role_name,
	};
	let results = role.add(roleP);
	if(results){
		res.redirect("/admin/role/danhsach")
	}else{
		res.json(err)
	}
}; 

module.exports.editRole = function (req, res, next) {
	role.updated(req.params.id, req.body.role_name, function (err, rows) {
        if (err) {
			res.json(err);
        } else {
			
			res.redirect("/admin/role/danhsach");
        }
    });
}

module.exports.deleteRole = function(req, res){
	let data_db = role.deleteRole(req.params.id);
	if (!data_db){
		res.json({
			code: 500,
			message: "Error DB"
		});
	}else{
		res.redirect("/admin/role/danhsach")		
	}		
}
