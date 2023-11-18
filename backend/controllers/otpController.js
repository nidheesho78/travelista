import Twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
// const TWILIO_SID = 'ACa04f0b06233fbd085e25957f403883d0';
// const TWILIO_AUTH_TOKEN = 'e8adfedea6f76bcae7e28608e8c65b47';
// const TWILIO_VERIFY = 'VA913f9aa021f35544c44f7b6a86928787';
console.log('port',process.env.PORT);

const client = new Twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const verifyServiceSid = process.env.TWILIO_VERIFY;

const sendOtp = async (mobileNumber) => {
  try {
    await client.verify.v2.services(verifyServiceSid).verifications.create({
      to: `${mobileNumber}`,
      channel: "sms",
    });
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to send the verification code");
  }
}; 

 const verifyCode = async (mobileNumber,code) => {
    try {
      console.log("mobileNumber",mobileNumber);
      const verification = await client.verify.v2.services(verifyServiceSid).verificationChecks.create({
        to: `${mobileNumber}`,
        code: code, 
      });
  
      if (verification.status === 'approved') {
        // The code is valid, proceed with the sign-up process
        console.log("Verification successful!");
        return true
        // You can implement your sign-up logic here.
      } else {
        return false
      }
    } catch (error) {
      console.log(error.message);
      throw new Error("Failed to verify code");
    }
  };


export { sendOtp, verifyCode };