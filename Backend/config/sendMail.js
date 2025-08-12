import nodemailer from "nodemailer"

import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.USERPASSWORD,
  },
});


const sendmail = async (to,otp) => {
  const info = await transporter.sendMail({
    from: process.env.USEREMAIL,
    to: to,
    subject: "Reset Your password",
    html:  `<p>Your OTP for password reset is <b>${otp}</b>.
    It expires in 5 minutes.</p>`, // HTML body
  });
  console.log("Message sent:", info.messageId);
};

export default sendmail;