import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: 'sandboxe919ae0242084069a1f922c247ce17f3.mailgun.org'
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: 'gounewbie@gmail.com',
    to: 'gounewbie@gmail.com',
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello~ ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://myclonedapp.com/verification/${key}/">here</a>`;
  return sendEmail(emailSubject, emailBody);
}