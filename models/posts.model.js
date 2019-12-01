var db = require('../common/database');
const moment = require('moment');
  
function getAll(callback){
	return db.query("SELECT post_id, title, image, description, content, publish_date,typenews.type_id, views_count, slug, type_name, category_id,slugT  FROM posts inner join typenews on typenews.type_id = posts.type_id  WHERE posts.isactive = 1 ORDER by publish_date desc", callback);
}
function getTemporary(callback){
	return db.query("SELECT post_id, title, image, description, content, publish_date,typenews.type_id, views_count, slug, type_name, category_id,slugT  FROM posts inner join typenews on typenews.type_id = posts.type_id  WHERE posts.isactive = 0 ORDER by publish_date desc", callback);
}

function add(post, callback) {
    let publish_date = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(publish_date);
    let updated_date = moment().format("YYYY-MM-DD HH:mm:ss");
    return db.query("INSERT INTO `posts`(`title`,`image`,`description`,`content`,`publish_date`,`tag_name`,`type_id`,`views_count`,`updated_date`, `isactive`)VALUES(?,?,?,?,?,?,?,?,?,?);", [post.title, post.image,post.description, post.content,publish_date,post.tag_name,post.type_id, 0,updated_date, 1 ], callback); 
                
 }
 

 function temporary(id,callback){
    let updated_date = moment().format("YYYY-MM-DD HH:mm:ss");
    return db.query('UPDATE `posts` SET `updated_date` = ?, `isactive` = ? where post_id = ? ',[updated_date,0,id],callback);
 }

 function restore(id,callback){
    let updated_date = moment().format("YYYY-MM-DD HH:mm:ss");
    return db.query('UPDATE `posts` SET `updated_date` = ?, `isactive` = ? where post_id = ? ',[updated_date,1,id],callback);
 }
 function deletePost(id, callback) {
     return db.query("DELETE FROM `posts` WHERE post_id=?", [id], callback);
 }
 function deleteAllPost(callback) {
    return db.query("DELETE FROM `posts` WHERE isactive = 0", callback);
}
 module.exports = {
     getAll: getAll,
     deletePost: deletePost,
     add: add,
     temporary:temporary,
     getTemporary:getTemporary,
     restore:restore,
     deleteAllPost:deleteAllPost
 }