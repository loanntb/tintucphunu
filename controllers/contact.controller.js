const nodemailer = require('nodemailer');
const Contact = require("../models/contact.model");
module.exports.getContact= function(req, res) {
	Contact.getAll(function(err,rows){
        if(err){
          res.render("liên hệ", {data: {error: "Lỗi! Xin thử lại sau"}});
      } else {
        let data = {
            title:'liên hệ',  
            contacts: rows,
          }
          console.log(data);
          res.render("admin/lienhe/danhsach", { data: data });
        }
      });
};

module.exports.getMessage = function(req, res) {
  console.log(req.params.id);
  U.getByID(req.params.id,function(err,rows){
    if(err){
    console.log(err);
  } else {
    let data = {
      title:'Tin nhắn chi tiết',  
      message: rows,
        }
        console.log(data);
    res.render('admin/lienhe/chitiet', {
            data:data
        });
    }
  });
};

module.exports.deleteContact = function(req, res){
	let data_db = Contact.deleteContact(req.params.id);
	if (!data_db){
		res.json({
			code: 500,
			message: "Error DB"
		});
	}else{
		res.redirect("/admin/lienhe/danhsach")
				
	}		
}
module.exports.addMessage = function (req, res,err) {
	contact = {
        name:req.body.name,
        email:req.body.email,
        message: req.body.message
    };
    console.log(contact);
    let results = Contact.add(contact);
    Contact.getByEmail(contact.email, function(err, rows){
        let email = contact.email
        console.log(email)
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
               service: 'Gmail',
                auth: {
                  user: 'phunu24h7@gmail.com',
                  pass:'phunuonline2019'
                }
            });
          const mailOptions = {
            to: '"Báo Phụ Nữ"<phunu24h7@gmail.com>',
            from: email,
            subject: 'Tin nhắn mới từ báo phụ nữ online',
            text: 
            `Tên người gửi :${req.body.name} \n
            Email :${req.body.email} \n
            Lời nhắn :${req.body.message} \n`
          };
          console.log(mailOptions);
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
          res.redirect('../');
        });

    });
}; 
