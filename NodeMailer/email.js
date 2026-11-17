import nodemailer from "nodemailer";

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'krushna.bangar@tekditechnologies.com',
        pass: 'nqth iaol wuie kqiv' // Use a Google App Password, not your login password
    }
});

const mailDetails = {
    from: 'krushna.bangar@tekditechnologies.com',
    to: 'bangark501@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail'
};

mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
        console.error('Error Occurs:', err.message);
    } else {
        console.log('Email sent successfully:', data.response);
    }
});
