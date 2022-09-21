const nodemailer = require('nodemailer');
const {NO_REPLY_EMAIL, NO_REPLY_PASSWORD} = require('../configs/configs');
const emailTemplatesObj = require('../email-templates/user.email-templates');

const sendEmail = (userMail, emailAction) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_PASSWORD
        }
    });

    const emailInfo = emailTemplatesObj[emailAction]

    return transporter.sendMail({
        from: 'March 2022', // від кого повідомлення
        to: userMail, //хто отримує повідомлення
        subject: emailInfo.subject, // тема повідомлення
        html: emailInfo.html
    });
};

module.exports = {
    sendEmail
};
