const nodeMailer = require('../config/nodemailer');


// this is another way of exporting method
exports.newComment= (comment)=>{
    
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    
    nodeMailer.transporter.sendMail({
        from:'mangekyusharingan27@gmail.com',
        to:comment.user.email,
        subject:'New comment created',
        html:htmlString,

    },
    (err,info)=>{
        if(err){
            console.log('error in sending mail',err)
            return;
        }
        console.log('mail delievered',info);
        return;
    }
    )
}