const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// OAuth2 Client setup
const CLIENT_ID =
  "30860311309-06oj8343luvomfv11m8j1q7rtin6j69d.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04ejCox7epND7CgYIARAAGAQSNwF-L9Irz5IlMl8ZBSJtVl4jP4LUH9OZmHQA_M-9M8EkLW41fOSD2Oqhi3CHIjau5C4EZRPRA5E";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Send email using Nodemailer with OAuth2
async function sendMail(to, subject, htmlContent) {
  try {
    const accessToken = await oAuth2Client.getAccessToken(); // Get a new access token

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "hr.talentconnect111@gmail.com", // Replace with your Gmail address
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: "Admin <hr.talentconnect111@gmail.com>", // Change as needed
      to: to,
      subject: subject,
      html: htmlContent, // Email content
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", result);
    return result;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
}

module.exports = sendMail;
