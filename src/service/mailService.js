const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const fs = require('fs');
require('dotenv').config()

const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN});

// console.log(process.env.CLIENT_ID, '\n', process.env.CLIENT_SECRET, '\n', process.env.REFRESH_TOKEN, '\n', process.env.GOOGLE_USER)

class MailService {
  accessToken = OAuth2_client.getAccessToken();
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: this.accessToken
      }
    })
  }

  async sendActivationMail(body, file) {
    try {
      let attachment = [];
      if(file.length) {
        attachment = [{
          filename: file[0].originalname,
          content: file[0].buffer,
        }]
      }
      await this.transporter.sendMail({
        from: 'berezovskyiruslanwork@gmail.com',
        to: process.env.EMAIL_TO,
        subject: 'contact Erbis',
        text: '',
        attachments: attachment,
        html: `
          <div>
            <p>name: ${body.name || '-'}</p>
            <p>email: ${body.email || '-'}</p>
            <p>messages: ${body.message || '-'}</p>
            <p>privacyConfirm: ${body.privacyConfirm || '-'}</p>
            <p>subscribeForNews: ${body.subscribeForNews || '-'}</p>
            <p>receiveNDA: ${body.receiveNDA || '-'}</p>
          </div>
        `
      }).then(res => {
        return {message: "success"}
      })
    } catch (e) {
      return e;
    }
    
  }
}

module.exports = new MailService();