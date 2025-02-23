const twilio = require("twilio");
const logger = require("./logger");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendOTP = async (mobile, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
      from: twilioNumber,
      to: mobile,
    });

    logger.info(`OTP sent successfully to ${mobile}: ${message.sid}`);
    return true;
  } catch (error) {
    logger.error(`Error sending OTP to ${mobile}: ${error.message}`);
    throw new Error("Failed to send OTP. Please try again.");
  }
};

module.exports = sendOTP;
