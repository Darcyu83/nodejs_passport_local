const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/login", (req, res, next) => {
  // local strategy 실행

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      //로그인 실패
      return next(err);
    }
    return req.login(user, (err) => {
      if (err) return next(err);

      //로그인 유저 정보를 response로 내려줌
      //   res.status(200).json({ loginUser: user });
      res.redirect("/");
    });
  })(req, res, next);
});

module.exports = router;
