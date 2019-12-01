const Category = require("../models/categories.model");


module.exports.getCategory = function(req, res) {
	Category.getAll(function(err,rows){
	  if(err){
		let data = {
			error: "Xin lỗi! Có lỗi xảy ra"
		}
		res.render("admin", { data: data });
	} else {
	  let data = {
		  title:'admin',  
		  categories: rows,
		}
		res.render("admin/theloai/danhsach", { data: data });
	  }
	});
  };

module.exports.postNewCategory = function (req, res,err) {
	category = {
        categoryName:req.body.name
	};
	let results = Category.add(category);
	if(results){
		res.redirect("/admin/theloai/danhsach")
	}else{
		res.json(err)
	}
}; 

module.exports.editCategory = function (req, res, next) {
	Category.updated(req.params.id, req.body.name, function (err, rows) {
        if (err) {
			res.json(err);
        } else {
			
			res.redirect("/admin/theloai/danhsach");
        }
    });
}

module.exports.deleteCategory = function(req, res){
	let data_db = Category.deleteCategory(req.params.id);
	if (!data_db){
		res.json({
			code: 500,
			message: "Error DB"
		});
	}else{
		res.redirect("/admin/theloai/danhsach")
				
	}		
}
