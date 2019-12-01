const home = require('./home.route');
const conf = require('./conf');
const fileman = require('./fileman');
const admin = require('./admin.route');
const theloai = require('./categories.route');
const baiviet = require('./posts.route');
const loaitin = require('./type.route');
const sukien = require('./event.route');
const role = require('./role.route');
const user = require('./user.route');
const contact = require('./contact.route');
const profile = require('./profile.route');
const lienhe = require('./contactMe.route');
module.exports = (app) => {
	app.use('/',home);
    app.use('/conf.json', conf);
    app.use('/fileman', fileman);
    app.use('/admin',admin);
    app.use('/admin/theloai', theloai);
    app.use('/admin/baiviet', baiviet);
    app.use('/admin/loaitin', loaitin);
    app.use('/admin/sukien', sukien);
    app.use('/admin/role', role);
    app.use('/admin/user', user);
    app.use('/admin/lienhe', lienhe);
    app.use('/contact', contact);
    app.use('/user', profile);
}