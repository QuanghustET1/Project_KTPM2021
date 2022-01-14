require('dotenv').config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_APP, // generated ethereal user
            pass: process.env.MAIL_APP_PASSWORD // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Quangdeptrai@gmail.com', // sender address
        to: dataSend.receivedUser, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: `
            <h3>Chào bro, ${dataSend.patientName}!</h3>
            <p>Bạn đã đăng kí khám bệnh thông qua Quangdz.com</p>
            <p>Thông tin đặt lịch khám bệnh:</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Vui lòng xác nhận thông tin bằng cách click vào link xác nhận : <a href="https://www.facebook.com/Quang.hust.et1.bka01" target="_blank">Click here</a></p>
        `, // html body
    });
}



// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //   let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport


    //   console.log("Message sent: %s", info.messageId);
    //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //   // Preview only available when sending through an Ethereal account
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}