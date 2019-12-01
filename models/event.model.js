var db = require('../common/database');

function getAll(callback){
	return db.query("SELECT * FROM event", callback);
}

function add(event, callback) {
    return db.query("INSERT INTO `event`(`event_name`) VALUES (?)", [event.event_name], callback); 
               
}

function updated(id, event, callback){
    return db.query("UPDATE `event` SET event_name = ? where event_id = ? ",[event,id],callback);
}

function deleteEvent(id, callback) {
    return db.query("DELETE FROM `event` WHERE event_id=?", [id], callback);
}


module.exports = {
    getAll: getAll,
    deleteEvent: deleteEvent,
    add: add,
    updated: updated,
}