const { nodeMailer } = require("./node-mailer");
// const config = require("../../config/config");

const sendOtpMail = async (data) => {
  const emailData = {
    reciever: data?.reciever, // Email recipient
    subject: "Verify your email", // Subject line
    templateFile: "otpMail", // The name of the Handlebars file (without .handlebars extension)
    context: {
      name: data.name,
      otpCode: data.otpCode,
    },
    priority: "normal", // Pass priority, default to 'normal'
    // Data to pass to the template
  };

  try {
    await nodeMailer(emailData);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendOtpMail;
