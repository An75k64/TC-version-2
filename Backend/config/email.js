const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// OAuth2 Client setup
const CLIENT_ID =
  "30860311309-06oj8343luvomfv11m8j1q7rtin6j69d.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:5000/auth/google/callback";
const REFRESH_TOKEN =
  "1//0grm_3tYt-B_bCgYIARAAGBASNwF-L9Irh6w6SjBvpUK12apaVTIRyO1INyJiIoM_WiIGvUQeXIEuTKeL_qojJmej2RzF7_97K-8";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Send email using Nodemailer with OAuth2
async function sendMail(to, subject, htmlContent) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    if (accessToken.token === null) {
      console.log(
        "Failed to retrieve access token. Reauthorization might be needed."
      );
      throw new Error("Failed to retrieve access token.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "hr.talentconnect111@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: "Admin <hr.talentconnect111@gmail.com>",
      to,
      subject,
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", result);
    return result;
  } catch (error) {
    if (
      error.code === 401 ||
      (error.response && error.response.status === 401)
    ) {
      console.error(
        "Access token expired or invalid. Reauthorization may be needed."
      );
    } else {
      console.error("Error sending email: ", error);
    }
    throw error;
  }
}

module.exports = sendMail;
