const speakeasy = require("speakeasy");
const { sendEmail } = require("./mail.services");

exports.sendOTP = async (email) => {
  const otp = speakeasy.totp({
    secret: email + process.env.SECRET,
    digits: 6,
  });
  try {
    const mailRes = await sendEmail(
      email,
      "OTP verification",
      "Your One-time password is: " + otp
    );
    // console.log("Email response:", mailRes);
    return mailRes;
  } catch (error) {
    // console.error('Error sending email:', error);
    throw error;
  }
};

exports.verifyOTP = (email, otp) => {
  const is_verified = speakeasy.totp.verify({
    secret: email + process.env.SECRET,
    token: otp,
    window: 3,
    encoding: "ascii",
  });
  // console.log("otp : " + otp + " is_verified : " + is_verified);
  return is_verified;
};
