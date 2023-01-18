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
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 2,
    },
  })
);

function isAuthenticatedMiddleware(req, res, next) {
  console.log("req.headers.cookie", req.headers.cookie);
  if (req.headers.cookie) {
  }
  next();
}

app.get("/", isAuthenticatedMiddleware, (req, res) => {
  // 로그인 성공 시 serialize하고 req.session.passport.user 에 담김
  // 로그인 성공하고 deserialize하고 req.user 에 담김

  res.send("Hi");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
