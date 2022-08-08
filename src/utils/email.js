import nodemailer from 'nodemailer';
import {Session} from '../models/session.js';

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
  
export async function run(text, sessionId) {
    const session = await Session.find({id_user: sessionId});
    let name = 'Não identificado';
    if(session.length > 0){
      name = session[0].title_email
    }
    const mailSent = await transporter.sendMail({
        text: text,
        subject: "<Chatbot loac>",
        from: "Chatbot loac <botLoac@gmail.com> - " + name,
        to: process.env.EMAILS_SENDING,
    });
}

export async function saveTitleEmail(titleEmail, sessionId){
  const session = await Session.find({id_user: sessionId});
  if(session.length < 1){
    await Session.create({
      id_user: sessionId,
      title_email: titleEmail
    })
  }
  else {
    await Session.findOneAndUpdate({id_user: sessionId}, { id_user: sessionId, title_email: titleEmail});
  }
  console.log(titleEmail + ' ' + sessionId);
}