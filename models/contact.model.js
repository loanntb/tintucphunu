var db = require('../common/database');

function getAll(callback){
	return db.query("select *from contact", callback);
}
function getByID(id,callback){
	return db.query("select *from contact where contact_id = ?  ",[id], callback);
}
function getByEmail(email,callback){
	return db.query("select *from contact where email = ?  ",[email], callback);
}
function add(contact, callback) {
    return db.query("INSERT INTO `contact`(`name`,`email`, `message`) VALUES (?,?,?)", [contact.name,contact.email,contact.message], callback); 
               
}
function deleteContact(id, callback) {
    return db.query("DELETE FROM `contact` WHERE contact_id=?", [id], callback);
}

module.exports = {
    getAll: getAll,
    getByID: getByID,
    add: add,
    deleteContact:deleteContact,
    getByEmail:getByEmail
}