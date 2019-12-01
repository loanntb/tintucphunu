const Posts = require("../models/posts.model");
const Type = require("../models/type.model");
const db = require("../common/database");
const Router = require('express-promise-router')
const router = new Router()
const bodyParser = require('body-parser')
const moment = require('moment');
const multer = require('multer');
const path = require('path');
router.use(bodyParser.urlencoded({ extended: true }))

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/Uploads/Images/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: File không phải là hình ảnh!');
  }
}

module.exports.getAll = function(req, res) {
  Posts.getAll(function(err,rows){
    if(err){
      res.json(err);
  } else {
    let data = {
        title:'Danh sách',  
        posts: rows,
      }
      res.render("admin/baiviet/danhsach", { data: data });
    }
  });
};

module.exports.getTemporaryPost = function(req, res) {
  Posts.getTemporary(function(err,rows){
    if(err){
      res.json(err);
  } else {
    let data = {
        title:'Danh sách xóa tạm',  
        postsT: rows,
      }
      res.render("admin/baiviet/danhsachT", { data: data });
    }
  });
};

module.exports.getAdd = function (req, res, next) {
  Type.getAll(function(err,rows){
    if(err){
      res.render("admin");
  } else {
    let data = {
        title:'Loại tin',  
        types: rows,
      }
      res.render("admin/baiviet/them", { data: data });
    }
  });
};


module.exports.postNewPost = function (req, res, next) {
	upload(req, res, function(error){
    post = {
      title: req.body.title,
      description:req.body.description,
      content: req.body.content,
      type_id: req.body.type_name,
      image: req.file.filename,
      tag_name:req.body.tags
    };
    let results = Posts.add(post);
    console.log(post.tag_name)
    if(results){
      res.redirect("/admin/baiviet/danhsach");
    }else{  
			res.render("/admin/baiviet/them");
    }
  });
}; 

module.exports.getEditPost = function (req, res, next) {
  return new Promise(function(resolve, reject) {
    try {
        const postQ  = 'SELECT * FROM posts inner join typenews on typenews.type_id = posts.type_id  where post_id = ' + req.params.id;
        db.query(postQ, function(err, post, fields){
            if(err){
                return reject(err);
            }else{
                const typeQ = 'SELECT * FROM typenews';
                db.query(typeQ, function(err, type, fields){
                    if(err){
                        return reject(err);
                    }else{
                        resolve({
                            post: post,
                            type: type,
                        });
                        let data = {
                            post: post,
                            type: type
                        }
                        res.render('admin/baiviet/sua', {
                           data:data
                        });
                    }
                })
            }
        }) 
    } catch (error) {
        
    }
    
});
}

module.exports.postEditPost = function (req, res, next) {
  upload(req,res,function(error){
    const id = req.params.id;
    const  title = req.body.title;
    const  description = req.body.description;
    const  type_id = req.body.type_name;
    const  content = req.body.content;
    console.log(type_id)
    try{
      const imageQ = 'SELECT image FROM posts WHERE  posts.isactive = 1 and posts.post_id = ' + id;
      db.query(imageQ, function (err,image, fields){
        if (err) throw err;
        console.log(image)
        if(image != null){
          let updated_date = moment().format("YYYY-MM-DD HH:mm:ss");
          const updateQ = "UPDATE posts SET  title = '" + title + "', description = '" + description + "', content = '" + content + "', type_id = '" + type_id + "', updated_date = '" + updated_date + "' WHERE post_id = " + id;
          db.query(updateQ, function (err, update, fields){
            if (err) throw err;
            res.redirect("/admin/baiviet/danhsach");
          });
        } else{
          let updated_date = moment().format("YYYY-MM-DD HH:mm:ss");
          const updateQ = "UPDATE posts SET  title = '" + title + "', description = '" + description + "', content = '" + content + "', type_id = '" + type_id + "', image = '" + req.file.filename + "', updated_date = '" + updated_date + "' WHERE post_id = " + id;
          db.query(updateQ, function (err, update, fields){
            if (err) throw err;
            res.redirect("/admin/baiviet/danhsach");
          });
        }

      })
    }catch(err){
     console.log('lỗi')
    }
  });
}
module.exports.temporaryPost =  function(req, res, next){
  Posts.temporary(req.params.id, function(err, rows){
    if(err){
      res.json(err);
   }else{
    res.redirect("/admin/baiviet/danhsach");
   }
  });
}
module.exports.restorePost =  function(req, res, next){
  Posts.restore(req.params.id, function(err, rows){
    if(err){
      res.json(err);
   }else{
    res.redirect("/admin/baiviet/danhsach");
   }
  });
}

module.exports.deletePost = function(req, res){
  let data_db = Posts.deletePost(req.params.id);
  console.log(req.params.id)
	if (!data_db){
		res.json({
			code: 500,
			message: "Error DB"
		});
	}else{
		res.redirect("/admin/baiviet/danhsach")			
	}
		
}

module.exports.deleteAllPost = function(req, res){
  let data_db = Posts.deleteAllPost();
	if (!data_db){
		res.json({
			code: 500,
			message: "Error DB"
		});
	}else{
		res.redirect("/admin/baiviet/danhsach")			
	}
}