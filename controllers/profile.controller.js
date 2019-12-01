const U = require("../models/user.model");

module.exports.editU = function (req, res, next) {
    let data = {
        email:req.body.email,
        password:req.body.password,
        full_name:req.body.full_name
    }
    console.log(data);
      U.updatedU(req.params.id, data, function (err, rows) {
        if (err) {
          res.json(err);
          } else {
          res.redirect("/");
          }
      });
}

module.exports.getInfo = function(req, res) {
    console.log(req.params.id);
	U.getUser(req.params.id,function(err,rows){
	  if(err){
		console.log(err);
	} else {
	  let data = {
		  title:'user',  
		  users: rows,
        }
        console.log(data);
		res.render('pages/profile', {
            data:data
        });
	  }
	});
  };
  