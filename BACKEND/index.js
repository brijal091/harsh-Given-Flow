const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const { getTransport, getToken, getMailOptions } = require("./service");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", (req, res) => {
  const { email } = req.body;
  if (!email) res.status(500).send("Invalid Email Address");

  const token = getToken(email);
  const link = `http://localhost:7010/verify?token=${token}`;

  let mailRequest = getMailOptions(email, link);

  //Send mail
  return getTransport().sendMail(mailRequest, (error) => {
    if (error) {
      res.status(500).send("Can't send email.");
    } else {
      res.status(200);
      res.send({
        message: `Link sent to ${email}`,
      });
    }
  });
});

app.listen(5000, () => console.log("Server is starting on port 5000"));
