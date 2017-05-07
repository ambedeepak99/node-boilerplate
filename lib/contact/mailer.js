/**
 * Created by deepak on 5/7/2017.
 */

var nodemailer = require('nodemailer');

var mailer = {};
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'test@gmail.com',
        pass: 'test'
    }
});

mailer.sendEmail = function (html_content, plain_text, subject_text, to_email, from_email, callback) {

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: from_email, // sender address
        to: to_email, // list of receivers
        subject: subject_text, // Subject line
        text: plain_text, // plaintext body
        html: html_content // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            callback(error, null);
        } else {
            console.log('Message sent: ' + info.response);
            callback(null, info);
        }
    });
};

mailer.sendEmailAttachment = function (html_content, plain_text, subject_text, to_email, from_email, attachment, callback) {

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Done ✔ <chekout.testing@gmail.com>', // sender address
        to: to_email, // list of receivers
        subject: subject_text, // Subject line
        text: plain_text, // plaintext body
        html: html_content // html body
    };
    if (attachment) {
        mailOptions['attachments'] = attachment;
    }
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            callback(error, null);
        } else {
            console.log('Message sent: ' + info.response);
            callback(null, info);
        }
    });
};

module.exports = mailer;