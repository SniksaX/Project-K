//src/services/email.service.ts

import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();
const my_gmail: string = process.env.EMAIL_PASS_GMAIL || "";
const my_outlook: string = process.env.EMAIL_PASS_OUTLOOK || "";
const my_password: string = process.env.PASS_WORD || "";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: my_gmail,
    pass: my_password
  }
});

export const sendVerificationEmail = async (email: string, token : string) => {
    
    const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`

    const mailOptions = {
        from: `"Project-K team" <${my_gmail}>`,
        to : email,
        subject: "Verify your Email - Project-K",
        html: `<h2>Welcome to Project-K!</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationLink}">${verificationLink}</a>`,
    };

    try {
        await transporter.sendMail(mailOptions)
        console.log(`verification email sent to ${email}`)
    } catch (error) {
        console.error("error sending email:", error)
    }
}