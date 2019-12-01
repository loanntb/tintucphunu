const U = require("../models/user.model");
const role = require("../models/role.model");
const db = require("../common/database")

module.exports.getU = function(req, res) {
	U.getAll(function(err,rows){
	  if(err){
		console.log(err);
	} else {
	  let data = {
		  title:'admin',  
		  users: rows,
		}
		res.render("admin/user/danhsach", { data: data });
	  }
	});
  };
  module.exports.getAdd = function (req, res) {
    role.getAll(function(err,rows){
      if(err){
        res.render("admin");
    } else {
      let data = {
          title:'Thêm',  
          roles: rows,
        }
        console.log(data.categories);
        res.render("admin/user/them", { data: data });
      }
    });
  
  };

module.exports.postNewU = function (req, res,err) {
    if (req.body.password!= req.body.repassword && req.body.password.trim().length != 0) {
		  res.render("admin/user/them", { data: { error: "Mật khẩu không khớp" } });
    }
    user = {
        email:req.body.email,
        password:req.body.password,
        full_name:req.body.full_name,
        role_id: req.body.role_id
    };
	let results = U.add(user);
	if(results){
		res.redirect("/admin/user/danhsach")
	}else{
		res.json(err)
	}
}; 

module.exports.editU = function (req, res, next) {
    let data = {
        email:req.body.email,
        password:req.body.password,
        full_name:req.body.full_name,
        role_id: req.body.role_id
    }
      U.updated(req.params.id, data, function (err, rows) {
        if (err) {
          res.json(err);
          } else {
          res.redirect("/admin/user/danhsach");
          }
      });
}

module.exports.getEditU = function (req, res, next) {
  return new Promise(function(resolve, reject) {
    try {
        const editQ  = 'select user_id,roles.role_id,email,password,full_name,role_name from users inner join roles on roles.role_id = users.role_id  where users.user_id = ' + req.params.id;
        db.query(editQ, function(err, roles, fields){
            if(err){
                return reject(err);
            }else{
                const roleQ = 'SELECT * FROM roles';
                db.query(roleQ, function(err, role, fields){
                    if(err){
                        return reject(err);
                    }else{
                        resolve({
                            roles: roles,
                            role: role
                        });
                        let data = {
                            roles: roles,
                            role: role
                        }
                        res.render('admin/user/sua', {
                            data:data
                         });
                         console.log(data);
                    }
                })
            }
        }) 
    } catch (error) {
        console.log(error);
    }
    
  });
}
module.exports.deleteUser = function(req, res){
	let data_db = U.deleteU(req.params.id);
	if (!data_db){
		res.json({
			code: 500,
			message: "Error DB"
		});
	}else{
		res.redirect("/admin/user/danhsach")		
	}		
}
