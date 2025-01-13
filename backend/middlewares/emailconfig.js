import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 465,
  secure:true,
  requireSSL: true,

  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASS  //ygfakhmesloxgppe
  }

  });
