const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:465,
            secure:false,
            service:process.env.SMTP_SERVICE,
            auth:{
                user:process.env.SMTP_MAIL,
                pass:process.env.SMTP_PASSWORD
            }
        })

        const mailOptions = {
            from :process.env.SMTP_MAIL,
            to:options.email,
            subject:options.subject,
            text:options.message,
        }

      await transporter.sendMail(mailOptions);
};

    module.exports = sendEmail;