/**
 * Created by Nikhil on 24/05/17.
 */
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

function sendMail(member, password) {
  const transporter = nodemailer.createTransport(smtpTransport({
    host: 'mail.rdv-iitd.com',
    port: 587,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: 'admin@rdv-iitd.com',
      pass: 'sudo_rdv'
    }
  }));
  const mailOptions = {
    from: '"Rendezvous Web Admin" \<admin@rdv-iitd.com\>', // sender address
    to: member.email, // list of receivers
    subject: 'Hello from Rendezvous Admin Portal!',
    html: 'Hey ' + member.name + ', <br/><br/>Congratulations on being selected as the <b>' + member.designation +
    '</b> for Rendezvous! You can access your admin account at http://admin.rdv-iitd.com with the following credentials.' +
    '<br/><br/><p style="text-indent: 6em;margin: 0;padding: 0"><b>Username:</b> ' + member.email + '</p>' +
    '<p style="text-indent: 6em;margin: 0;padding: 0"><b>Password:</b> ' + password + '</p><br/>' +
    'You\'re recommended to change your password after logging in. ' +
    'Best of luck and have a great RDV! :) <br/><br/>Regards,<br/>Rendezvous Web Admin',
  };
  transporter.sendMail(mailOptions, (error, info) => {
    transporter.close();
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = {
  sendMail: sendMail,
};