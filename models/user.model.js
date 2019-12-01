var db = require('../common/database');

function getAll(callback){
	return db.query("select *from users inner join roles on roles.role_id = users.role_id  ORDER BY user_id", callback);
}
function getByEmail(email,callback){
	return db.query("select *from users inner join roles on roles.role_id = users.role_id  where email = ?  ",[email], callback);
}

function add(u, callback) {
    let user_resgistered = new Date();
    let updated_date = new Date();
    return db.query("INSERT INTO `users`(`email`,`password`,`full_name`,`role_id`,`user_resgistered`, `updated_date`) VALUES(?,?,?,?,?,?)", [u.email, u.password, u.full_name, u.role_id, user_resgistered, updated_date], callback);               
}
function addClient(u, callback) {
    let user_resgistered = new Date();
    let updated_date = new Date();
    return db.query("INSERT INTO `users`(`email`,`password`,`full_name`,`role_id`,`user_resgistered`, `updated_date`) VALUES(?,?,?,?,?,?)", [u.email, u.password, u.full_name, 1, user_resgistered, updated_date], callback);               
}
function updated(id, u, callback){
    let updated_date = new Date();
    db.query("UPDATE `users` SET email = ?, password = ?,full_name = ?,role_id =?, updated_date = ?  where user_id = ? ",[u.email,u.password,u.full_name,u.role_id,updated_date,id],callback);
}
function updatedU(id, u, callback){
    let updated_date = new Date();
    db.query("UPDATE `users` SET email = ?, password = ?,full_name = ?, role_id = ?, updated_date = ?  where user_id = ? ",[u.email,u.password,u.full_name,2,updated_date,id],callback);
}

function deleteU(id, callback) {
    return db.query("DELETE FROM `users` WHERE user_id=?", [id], callback);
}
function getUser(id,callback){
	return db.query("select *from users inner join roles on roles.role_id = users.role_id where users.role_id = 2 and user_id = ?", [id], callback);
}
module.exports = {
    getAll: getAll,
    deleteU: deleteU,
    add: add,
    updated: updated,
    getByEmail:getByEmail,
    addClient:addClient,
    getUser:getUser,
    updatedU:updatedU
}