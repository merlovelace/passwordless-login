
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SG_KEY);


const sendGrid = async (email, token) => {
    const msg = {
        to: email,
        from: 'test@example.com', // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<a href="http://localhost:8058/authenticate_user?token=${token}">Click Me</a>`
    }

    console.log(msg)
    return sgMail.send(msg).then(r => {
        console.log('E-Posta Sent!')
    }).catch(e => {
        console.log(e)
    })
}

module.exports = sendGrid
