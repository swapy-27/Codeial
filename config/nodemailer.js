const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// create reusable transporter object using the default SMTP transport
//person who is gonna send the email
exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'mangekyusharingan27@gmail.com',
        pass: 'sasukeuchiha@27'
    }
})

exports.renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),data,
        function (err, template) {
            if (err) {
                console.log('Error in rendering template ', err)
            }
          
            mailHTML = template;
        }
    )
    return mailHTML;

}

