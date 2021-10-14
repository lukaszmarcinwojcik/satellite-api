const express = require("express");
const router = express.Router();
const sha512 = require("js-sha512");

const { createTokens} = require("../JWT");

const User = require("../models/user");

router.get("/", function (req, res, next) {
  res.json({ title: "uzytkownik" });
});

router.post("/register", (req, res) => {
  const { fullname, country, email, password, password2, hasAtomicButton } = req.body;

  let errors = [];

  if (!fullname || !country || !email || !password || !password2) {
    errors.push({ message: "Proszę wypełnic wszystkie pola" });
  }

  if (password !== password2) {
    errors.push({ message: "Hasła różnia się od siebie" });
  }

  if (password.length < 8) {
    errors.push({ message: "Hasło musi zawierac conajmniej 8 znaków" });
  }

  if (errors.length > 0) {
    res.json({
      errors,
      fullname,
      country,
      email,
      password,
      password2,
      hasAtomicButton,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ message: "Użytkownik o podanym emailu istnieje" });
        res.json({
          errors,
          fullname,
          country,
          email,
          password,
          password2,
          hasAtomicButton,
        });
      } else {
        const newUser = new User({
          fullname,
          country,
          email,
          password,
        });
        newUser.password = sha512(newUser.password);
        newUser
          .save()
          .then((user) => {
            res.json({ message: "Udało Ci sie zarejestrować" });
          })
          .catch((err) => console.log(err));
      }
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const hashpassword = sha512(password);

  let errors = [];

  if (!email) {
    errors.push({ message: "Proszę wpisać email" });
  }
  if (!password) {
    errors.push({ message: "Proszę wpisać hasło" });
  }

  if (errors.length > 0) {
    res.json({
      errors,
      email,
      password: "",
    });
  } else {
    const user = User.findOne({ email: email, password: hashpassword }).then(
      (user) => {
        if (!user) {
          errors.push({ message: "Błędny login lub hasło" });
          res.json({
            errors,
            email,
            password: "",
          });
        } else {
          const accessToken = createTokens(user);
          res.json({
            isLogged: true,
            accessToken: accessToken,
            user: user,
          });
        }
      }
    );
  }
});

module.exports = router;



