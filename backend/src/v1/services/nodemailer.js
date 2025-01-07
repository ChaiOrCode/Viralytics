import { createTransport } from "nodemailer";

const connectTONodemailer = () => {
  // create reusable transporter object using the default SMTP transport
  const transporter = createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: "fastjustice3@gmail.com",
      pass: "fastjustice@1234",
    },
    secure: true,
  });
  return transporter;
};

export default connectTONodemailer;
