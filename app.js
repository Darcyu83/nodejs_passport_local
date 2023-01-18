const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const app = express();

const authRouter = require("./router/auth");
const initPassport = require("./passport/index");

initPassport(app, passport);
app.set("port", process.env.port || 3000);
const PORT = app.get("port");

//header에 있는 cookie를 req.cookie에 저장 => 그냥 req.headers.cookie 쓰자
// app.use(cookieParser());

//application/json 형태의 데이터 req.body에 저장
app.use(express.json());

//www-form-urlencode 형태의 데이터 req.body에 저장
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    //sessionID 암호화 시 사용되는 값
    secret: "yuds_secret",
    //session 변경 되지 않아도 저장
    resave: false,
    saveUninitialized: true,
    cookie: {
      //cookie expired 되는 시간
      maxAge: 1000 * 60 * 2,
    },
  })
);

//passport 초기화
app.use(passport.initialize());
//세션 연결
app.use(passport.session());

function isAuthenticatedMiddleware(req, res, next) {
  console.log("req.headers.cookie=", req.headers.cookie);

  const isAuthenticated = req.isAuthenticated();
  console.log("req.isAuthenticated() === ", isAuthenticated);

  if (!isAuthenticated) {
    return next("route");
  }

  next();
}

app.get("/", isAuthenticatedMiddleware, (req, res) => {
  // 로그인 성공 시 serialize하고 req.session.passport.user 에 담김
  // 로그인 성공하고 deserialize하고 req.user 에 담김

  res.send(`<h1>${req.user.name}님 로그인 하셧군요.</h1>`);
});

app.get("/", (req, res) => {
  // 로그인 성공 시 serialize하고 req.session.passport.user 에 담김
  // 로그인 성공하고 deserialize하고 req.user 에 담김

  res.send(`<form method="post" action="/auth/login">
              <span>Email : </span>
              <input name="email"  />
              <br/>
              <span>Password : </span>
              <input name="pwd"  />
              <br/>
              <input type="submit" text="로그인하기" />  
            </form>`);
});

app.use("/auth", authRouter);

//Error Handler
app.use((err, req, res, next) => {
  console.log("++++++++++++++Error!!!!!+++++++++++++", err.message);
  console.log(err.stack);
  res.status(err.status || 500);
  res.json({ code: err.code, msg: err.message, status: err.status });
});

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });

// 테스트를 위해 app 객체를 export
module.exports = app;
