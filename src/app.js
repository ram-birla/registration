const express = require("express");
require("./db/conn");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const hbs = require("hbs");

const Register = require("./models/register");

// const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await Register.findOne({ email: email, password: password})
        console.log(result);
        if (result) {
          res.status(201).render("index",{loggedIn: true,result: result});
        } else {
          res.render("login",{errorMessage: "Credentials not matching"});
        }
      } catch (e) {
        console.log(e);
        res.status(400).send(e);
      }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (password === confirmpassword) {
      const resgisterEmployee = new Register({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        password: password,
        confirmpassword: confirmpassword,
        phone: parseInt(req.body.phone),
        age: parseInt(req.body.age)
      });
      const result = await resgisterEmployee.save();
      console.log(result);
      res.status(201).redirect("/");
    } else {
      res.send("Password not matching");
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.get("/", (req, res) => {
  res.render("about");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
