const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
        pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
    },
});

// async..await is not allowed in global scope, must use a wrapper
// const sendEmails = async () => {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//         from: "miltonbaker.psoriatic@gmail.com", // sender address
//         to: "georgesteve31019@gmail.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     //
//     // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
//     //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
//     //       <https://github.com/forwardemail/preview-email>
//     //
// }

// sendEmails().catch(console.error);

const mailOptions = {
    from: "miltonbaker.psoriatic@gmail.com",
    to: "georgesteve31019@gmail.com",
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("nodemailer error==>", error);
    } else {
        console.log("Email sent: " + info.response);
    }
});


module.exports = sendEmails;
