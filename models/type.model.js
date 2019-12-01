var db = require('../common/database');

function getAll(callback){
	return db.query("SELECT * FROM typenews inner join categories on categories.category_id = typenews.category_id ORDER BY type_name", callback);
}

function add(type, callback) {
    console.log(type)
    return db.query("INSERT INTO `typenews`(`type_name`,`category_id`) VALUES (?, ?)", [type.type_name, type.category_id], callback); 
               
}

function updated(id, type, callback){
    return db.query("UPDATE `typenews` SET ? where type_id = ? ",[type,id],callback);
}

function deleteType(id, callback) {
    return db.query("DELETE FROM `typenews` WHERE type_id=?", [id], callback);
}


module.exports = {
    getAll: getAll,
    deleteType: deleteType,
    add: add,
    updated: updated,
}