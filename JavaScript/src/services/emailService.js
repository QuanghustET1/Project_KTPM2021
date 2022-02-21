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
        html: getBodyHTMLEmail(dataSend), // html body
    });
}
let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            `<h3>Chào bro, ${dataSend.patientName}!</h3>
        <p>Bạn đã đặt lịch thành công tại web Quangdeptrai.vn với thông tin như sau:</p>
        <p>Thông tin đặt lịch</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Vui lòng xác nhận thông tin trên bằng cách click vào link:<a href=${dataSend.redirectLink} target="_blank">Click here</a></p>
        <p>Chân thành cảm ơn</p>`
    }
    if (dataSend.language === 'en') {
        result =
            `<h3>Chào bro, ${dataSend.patientName}!</h3>
        <p>Bạn đã đặt lịch thành công tại web Quangdeptrai.vn với thông tin như sau:</p>
        <p>Thông tin đặt lịch</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Vui lòng xác nhận thông tin trên bằng cách click vào link:<a href=${dataSend.redirectLink} target="_blank">Click here</a></p>
        <p>Chân thành cảm ơn</p>`
    }
    return result;
}


let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            `<h3>Chào bro, ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên website Quanghandsome.vn</p>
        <p>Thông tin đặt lịch được gửi trong tệp đính kèm</p>
        <p>Chân thành cảm ơn</p>`
    }
    if (dataSend.language === 'en') {
        result =
            `<h3>Chào bro, ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên website Quanghandsome.vn</p>
        <p>Thông tin đặt lịch được gửi trong tệp đính kèm</p>
        <p>Chân thành cảm ơn</p>`
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.MAIL_APP,
                    pass: process.env.MAIL_APP_PASSWORD
                }
            });
            let infor = await transporter.sendMail({
                from: '"Quangdeptrai@gmail.com', // sender address
                to: dataSend.email, // list of receivers
                subject: "Xác nhận đặt lịch thành công", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend), // html body
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            });
            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
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
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}