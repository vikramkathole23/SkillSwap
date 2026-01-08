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
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: "teamskillswap12@gmail.com",
      to: toMail,
      subject: subject,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
