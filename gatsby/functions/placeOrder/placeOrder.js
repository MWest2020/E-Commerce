const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const info = await transporter.sendMail({
    from: 'Pizza Power <test@example.com>',
    to: 'order@example.com',
    subject: 'New order!',
    html: `<p>Your new pizza is here!</p>`,
  });
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
