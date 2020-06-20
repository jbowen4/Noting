// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/notingDB", {useNewUrlParser: true});

const userSchema = {
  email: String,
  password: String
};

const User = new mongoose.model("User", userSchema);

const noteSchema = {
  title: String,
  content: String
};

const Note = mongoose.model("Note", noteSchema);

const categorySchema = {
  notes: [Note]
};

const Category = mongoose.model("Category", categorySchema);

app.get("/", function(req, res){
  res.render("index");
});

app.get("/home", function(req, res) {
  res.render("home");
});

app.get("/write", function(req, res){
  res.render("write");
});

app.post("/register", function(req, res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash){
    const newUser = new User({
      email: req.body.username,
      password: hash
    });
    newUser.save(function(err){
      if (err) {
        console.log(err);
      } else {
        res.render("home");
      }
    });
  });
});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function(err, result) {
          if (result === true) {
            res.render("home");
          }
        });
      }
    }
  });
});

app.post("/write", function(req, res){
  const note = new Note({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  note.save(function(err){
    if (!err){
        res.redirect("/home");
    }
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
