import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const sendMail = async (toMail, subject, code, userName) => {
  try {
    console.log(toMail, subject, code);
    const filePath = path.join(
      process.cwd(),
      "templates",
      "varifyEmailTemplate.html"
    );
    let html = fs.readFileSync(filePath, "utf8");

    html = html.replace("{{USER_NAME}}", userName);
    html = html.replace("{{CODE}}", code);

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user:  process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_API_KEY,
      },
    });
    await transporter.verify();
// console.log("SMTP ready");


    let mailOptions = {
      from: "SkillSwap <noreply@skillswap.com>",
      to: toMail,
      subject: subject,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        // return info;
      }
    });

  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
