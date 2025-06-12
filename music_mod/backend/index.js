const express = require("express");
const mongoose = require("mongoose");
const Usermodel = require("./model/User");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent with requests
    methods: ["GET", "POST"], // Specify allowed methods
    // Replace with your frontend URL
  })
);
app.use(cookieParser());
// Middleware to parse JSON bodies
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/Users");
// pass the data from frontend

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.json("Token was not found");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Token is Wrong");
      }
      next();
    });
  }
};
app.get("/", verifyUser, (req, res) => {
  res.json("Success");
});
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  // Hash the password before saving it to the database,its just about create new user
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      Usermodel.create({ name, email, password: hash })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

// get email,ps from request body,search user by email
// if user exist,compare password with bcrypt.compare
// 	Respond with success or error

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Usermodel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          res.json("Success");
        } else {
          res.json("Wrong Password");
        }
      });
    } else {
      res.json("User not found");
    }
  });
});
// retrive data ,use Usermodel to findone email if it is exist ,if userpassword euqal res.json success
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
