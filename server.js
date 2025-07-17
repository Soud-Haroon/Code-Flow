const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function exchangeCodeForToken(code, uri) {
  const data = {
    client_id: process.env.APP_ID,
    client_secret: process.env.APP_SECRET,
    code: code,
    redirect_uri: uri,
    grant_type: "authorization_code",
  };

  let tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return await tokenResponse.json();
}

app.use("/validateCode", async (req, res) => {
  const { code, uri } = req.query;

  try {
    const tokenData = await exchangeCodeForToken(code, uri);

    res.status(200).json(tokenData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.use("/", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

const PORT = process.env.PORT;
app.listen(PORT || 5500, () => {
  console.log("Service enabled at port - " + PORT);
});
