//const sgMail = require("@sendgrid/mail");
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv'
dotenv.config({ path: "./configs/config.env" });

//docs found at https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail
 const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const emailBody = req.body.message;
  const destination = req.body.destination;
  const subject = req.body.subject;
  try {
    const msg = {
      to: destination,
      from: process.env.VERIFIED_SENDER,
      subject: subject,
      text: emailBody,
    };
    const result = await sgMail
      .send(msg)
      .then((res) => {
        console.log(res);

        return;
      })
      .catch((error) => {
        console.error(error);
      });
    return res.json({ success: true, message: result });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export default sendEmail