// const twilio = require("twilio");
// const logger = require("./logger");

// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

// const client = twilio(accountSid, authToken);

// const sendOTP = async (mobile, otp) => {
//   try {
//     const message = await client.messages.create({
//       body: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
//       from: twilioNumber,
//       to: mobile,
//     });

//     logger.info(`OTP sent successfully to ${mobile}: ${message.sid}`);
//     return true;
//   } catch (error) {
//     logger.error(`Error sending OTP to ${mobile}: ${error.message}`);
//     throw new Error("Failed to send OTP. Please try again.");
//   }
// };

// module.exports = sendOTP;


const twilio = require("twilio");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOTP = async (mobile, otp) => {
  try {
    if (!/^\d{10}$/.test(mobile)) {
      throw new Error("Invalid mobile number format. Must be 10 digits.");
    }

    const formattedMobile = `+91${mobile}`; // Convert to E.164 format

    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Ensure this is correct
      to: formattedMobile, // Must be in E.164 format
    });

    console.log("OTP sent successfully:", message.sid);
    return message.sid;
  } catch (error) {
    console.error("Twilio Error:", error.message);
    throw new Error(error.message);
  }
};

module.exports = sendOTP;

