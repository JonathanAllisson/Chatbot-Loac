import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_CHATBOT,
      pass: process.env.PASS_CHATBOT,
    },
    tls: { rejectUnauthorized: false },
  });
  
export async function run(text, nameOrEmail) {
    const mailSent = await transporter.sendMail({
        text: text,
        subject: "<Chatbot loac>",
        from: "Chatbot loac <botLoac@gmail.com> - " + nameOrEmail,
        to: process.env.EMAILS_SENDING,
    });
}