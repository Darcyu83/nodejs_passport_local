const LocalStrategy = require("passport-local").Strategy;

const dummyUser = {
  id: 1,
  email: "yuds@gmail.com",
  pwd: "2",
  name: "yuds",
  age: 100,
};

module.exports = (app, passport) => {
  passport.use(
    new LocalStrategy(
      {
        //usernameField 와 passwordField에는 req.body에 일치하는 값 입력(없으면 에러)
        usernameField: "email",
        passwordField: "pwd",
      },
      (email, pwd, done) => {
        console.log("LocalStrategy === email/pwd");
        console.table({ email, pwd });
        if (email === dummyUser.email && pwd === dummyUser.pwd) {
          //session에 비밀번호는 제외 후 저장할 예정

          let user = JSON.parse(JSON.stringify(dummyUser));

          delete user.pwd;
          done(null, user);
        } else {
          //로그인 실패 (401 에러)
          const error = new Error("User is not exists!");
          error.status = 401;
          error.code = "Unauthorized";
          done(error);
        }
      }
    )
  );

  //serialize -> req.login 호출 시 user를 req.session.passport.user에 저장
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  //deserialize -> session에 로그인 된 user의 정보가 있다면, req.user에 저장
  passport.deserializeUser((user, done) => {
    if (user) {
      done(null, user);
    } else {
      done(null, null);
    }
  });
};
