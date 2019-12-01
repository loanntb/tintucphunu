var db = require('../common/database');

function getAll(callback){
	return db.query("select *from categories", callback);
}

function add(category, callback) {
    return db.query("INSERT INTO `categories`(`name`) VALUES (?)", [category.categoryName], callback); 
               
}

function updated(id, category, callback){
    return db.query("UPDATE `categories` SET name = ? where category_id = ? ",[category,id],callback);
}

function deleteCategory(id, callback) {
    return db.query("DELETE FROM `categories` WHERE category_id=?", [id], callback);
}


module.exports = {
    getAll: getAll,
    deleteCategory: deleteCategory,
    add: add,
    updated: updated,
}