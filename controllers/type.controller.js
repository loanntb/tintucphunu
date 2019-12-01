const Type = require("../models/type.model");
const Category = require("../models/categories.model");
const db = require("../common/database");

module.exports.getAll = function(req, res) {
    Type.getAll(function(err,rows){
      if(err){
        res.json(err);
    } else {
      let data = {
          title:'Danh sách',  
          types: rows
        }
        res.render("admin/loaitin/danhsach", { data: data });
      }
    });
  };
  
  module.exports.getAdd = function (req, res) {
    Category.getAll(function(err,rows){
      if(err){
        res.render("admin");
    } else {
      let data = {
          title:'Sửa',  
          categories: rows,
        }
        console.log(data.categories);
        res.render("admin/loaitin/them", { data: data });
      }
    });
  
  };

  module.exports.postNewType = function (req, res,err) {
    type = {
      type_name: req.body.type_name,
      category_id: req.body.name
    };
    let results = Type.add(type);
    if(results){
      res.redirect("/admin/loaitin/danhsach")
    }else{
      res.json(err)
    }
  }; 
  
  module.exports.postEditType = function (req, res, next) {
      console.log(req.body);
      Type.updated(req.params.id, req.body, function (err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.redirect("/admin/loaitin/danhsach");
        }
      });
  }
  
  module.exports.getEditType = function (req, res, next) {
    return new Promise(function(resolve, reject) {
      try {
          console.log( req.params.id)
          const typeQ  = 'select *from typenews inner join categories on typenews.category_id = categories.category_id  where type_id = ' + req.params.id;
          db.query(typeQ, function(err, type, fields){
              if(err){
                  return reject(err);
              }else{
                  const categoryQ = 'SELECT * FROM categories';
                  db.query(categoryQ, function(err, category, fields){
                      if(err){
                          return reject(err);
                      }else{
                          resolve({
                              type: type,
                              category: category
                          });
                          let data = {
                              type: type,
                              category: category
                          }
                          res.render('admin/loaitin/sua', {
                             data:data
                          });
                      }
                  })
              }
          }) 
      } catch (error) {
          console.log(error);
      }
  });
}
  
  module.exports.deleteType = function(req, res){
    let data_db = Type.deleteType(req.params.id);
    if (!data_db){
      res.json({
        code: 500,
        message: "Error DB"
      });
    }else{
      res.redirect("/admin/loaitin/danhsach")
    }		
  }
  