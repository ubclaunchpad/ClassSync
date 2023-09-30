const express = require("express");
// const User = require("../models/User");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config({ path: "./configs/config.env" });

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, authToken);


export const senEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const emailBody = req.body.message;
  const destination = req.body.destination;
  const subject = req.body.subject;
  try {
    const msg = {
      to: destination, // Change to your recipient
      from: "...", // Change to your verified sender
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
