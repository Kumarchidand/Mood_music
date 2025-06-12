Simple Login Logic Using bcrypt and MongoDB
js
Copy code
app.post("/login", (req, res) => {
  const { email, password } = req.body;
➡️ This extracts the email and password from the request body (user input from frontend form).

js
Copy code
  Usermodel.findOne({ email: email }).then((user) => {
➡️ This searches in the MongoDB database for a user document with the given email.

findOne() will return null if no user is found.

👇 Now two cases:
1️⃣ User Found
js
Copy code
    if(user){
      bcrypt.compare(password, user.password, (err, response) => {
        if(response){
          res.json("Success");
        } else {
          res.json("Wrong Password");
        }
      });
➡️ This uses bcrypt.compare() to compare:

password = the one entered by user in login form.

user.password = the hashed password stored in the database.

If the passwords match, it sends Success.
Otherwise, it sends Wrong Password.

Why bcrypt.compare()?
👉 Because passwords in the DB are stored in hashed format, not plain text.
So you cannot do password === user.password. You need to use bcrypt.compare().

2️⃣ User Not Found
js
Copy code
    } else {
      res.json("User not found");
    }
  });
});
➡️ If no user with that email exists, return "User not found".

🧠 Summary:
Step	Action	Purpose
1	Get email, password from request	Read user input
2	Search user by email	Check if account exists
3	If user exists, compare passwords using bcrypt	Authenticate
4	Respond with success or error	Tell user result

const express = require("express");
const mongoose = require("mongoose");
const Usermodel = require("./model/User");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/Users");
// pass the data from frontend

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  // Hash the password before saving it to the database
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
    if(user){
   bcrypt.compare(password,user.password,(err,response)=>{
      if(response){
        res.json("Success");
      }else{
        res.json("Wrong Password");
      }
    })
    }else{
      res.json("User not found");
    }
  });
});
// retrive data ,use Usermodel to findone email if it is exist ,if userpassword euqal res.json success
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
