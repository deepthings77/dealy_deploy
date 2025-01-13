
import {transporter} from './emailconfig.js';
import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemp.js";

export const sendEmailVerfication = async (email, verificationCode) => {
    try {
        
        const res = await transporter.sendMail({
            from: process.env.EMAIL_USER, 
            to: email, 
            subject: "Verify Your Email", 
            text: "Verify Your Email", 
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode), 
          });
        
          console.log("Message sent Successfully");
        
    } catch (error) {
        console.log("Error in sendEmail", error);
        
    }
};

export const sendWelcomeEmail=async(email,name)=>{
    try {
     const response=   await transporter.sendMail({
            from: process.env.EMAIL_USER,

            to: email, 
            subject: "Welcome Email", 
            text: "Welcome Email", 
            html: Welcome_Email_Template.replace("{name}",name)
        })
        console.log('Email send Successfully')
    } catch (error) {
        console.log('Email error',error)
    }
}