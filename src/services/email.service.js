const nodemailer = require('nodemailer');
const {NO_REPLY_EMAIL, NO_REPLY_PASSWORD} = require('../configs/configs');

const sendEmail = (userMail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_PASSWORD
        }
    });

    return transporter.sendMail({
        from: 'March 2022', // від кого повідомлення
        to: userMail, //хто отримує повідомлення
        subject: 'Test', // тема повідомлення
        html: '<div>Test</div>'
    });
};

module.exports = {
    sendEmail
};
