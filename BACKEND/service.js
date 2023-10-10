const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.getTransport = () =>
  nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "brijalkansara091@gmail.com",
      pass: "jtbm klnj eili wfnn",
    },
  });

exports.getToken = (email) => {
    const exDate = new Date();
    exDate.setMinutes(new Date().getMinutes() + 5)
    return jwt.sign({email, exDate}, "Brijal091Key")
}

exports.getMailOptions = (email, link) => {
    let body = `<h2>Hey ${email}</h2> <p>Here's the special magic link you requested:</p>
    <p>${link}</p> <p>Please note that for added security this link becomes invalid after 45 minutes</p>
    <p>Stay Jiggy</p>`;
    return{
        body,
        subject: "Brijal's Magic Link",
        to: email,
        html: body,
        from: "brijalkansara091@this.getMailOptions.com"
    }
}
