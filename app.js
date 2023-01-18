const express = require("express");
const session = require("express-session");

const app = express();

app.set("port", process.env.port || 3000);
const PORT = app.get("port");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "yuds_secret",
    cookie: {
      maxAge: 1000 * 60 * 2,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
