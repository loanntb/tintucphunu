var db = require('../common/database');

function getAll(callback){
	return db.query("SELECT * FROM roles ORDER BY role_id", callback);
}

function add(role, callback) {
    return db.query("INSERT INTO `roles`(`role_name`) VALUES(?)", [role.role_name], callback);               
}

function updated(id, role, callback){
    return db.query("UPDATE `roles` SET role_name = ? where role_id = ? ",[role,id],callback);
}

function deleteRole(id, callback) {
    return db.query("DELETE FROM `roles` WHERE role_id=?", [id], callback);
}


module.exports = {
    getAll: getAll,
    deleteRole: deleteRole,
    add: add,
    updated: updated,
}