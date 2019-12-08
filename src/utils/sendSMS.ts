import Twilio from 'twilio';

const { TWILIO_SID, TWILIO_TOKEN, TWILIO_PHONE } = process.env;

const twilioClient = Twilio(TWILIO_SID, TWILIO_TOKEN);

const sendSMS = (to: string, body: string) => {
  return twilioClient.messages.create({
    body,
    to,
    from: TWILIO_PHONE
  });
};

export const sendVerificationSMS = (to: string, key: string) => sendSMS(to, `Your verification key is : ${key}`);