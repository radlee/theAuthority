const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const mysql  = require('mysql');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const session = require('express-session');
const myConnection = require('express-myconnection');
const flash = require('express-flash');
const page5 = require('./routes/page5');
const mid = require('./middleware');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

// Not yet in used
var dbOptions = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'MMNTeam'
};

// What does this do ? -----------
var rolesMap = {
  "General" : "admin",
  "General101" : "user"
}

app.use(session({
  secret: '@pp Factori3',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 600000}
}))

//Make userID available in all templates / Creating Middleware ---------------
app.use(function(req, res, next){
  res.locals.currentUser = req.session.userID;
  next();
});

app.use(flash());
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
//setup handlebars
app.engine('hbs', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

// Get Methods-----------------------

app.get("/login", function(req, res, next){
  res.render("login")
})
app.get("/page1", mid.requiresLogin, function(req, res){
  res.render("page1", {
    user: req.session.user
  })
});
app.get("/page2", mid.requiresLogin, function(req, res){
  res.render("page2", {
    user: req.session.user
  })
});
app.get("/page3", mid.requiresLogin, function(req, res){
  res.render("page3", {
    user: req.session.user
  })
});
app.get("/page4", mid.requiresLogin, function(req, res){
  res.render("page4", {
    user: req.session.user
  })
});
app.get("/about", function(req, res){
  res.render("about", {
    user: req.session.user
  })
});
// Routed Views
app.get('/page5', mid.requiresLogin, page5.show);

// Delete the User session on logout
app.get("/logout", function(req, res){
  delete req.session.user;
  res.redirect("/login");
});

userList = [];

// Post Methods
app.post("/login", function(req, res, mext){

  if(req.body.username){
    var user =
    {
      inputName : req.body.username,
      inputPassword: req.body.password
    }

    if(user.inputName == "General" && user.inputPassword == "ahsAtC0d3X"){
      req.session.user = {
        name : req.body.username,
        is_admin : rolesMap[req.body.username] === "admin",
        user : rolesMap[req.body.username] === "user"
      };
      userList.push(req.session.user);

      console.log("User Roles");
      console.log(req.session.user);

      req.flash("warning", "Login Successful!");
      console.log("Success!");

      return res.render("home", {user: req.session.user});
    }
        else if(user.inputName == "General" && user.inputPassword != "ahsAtC0d3X"){
          req.flash("warning", "Wrong Password");
          console.log("Wrong Password!");
          return res.redirect("/login");
        }
        else if(user.inputName != "General"){
          req.flash("warning", "No such user name, Register for Free");
          console.log("User Does not Exist!");
          return res.redirect("/login");
        }
  }

  else {
    req.flash("warning", "Email and Password are required.");
    console.log("Provide Some Credentials");
    return res.redirect("/login");
  }
});

console.log(userList);

app.get("/", mid.requiresLogin, function(req, res, next){
  res.render("home",  {user:req.session.user});
});
app.get("/home", mid.requiresLogin, function(req, res){
  res.render("home",  {user:req.session.user});
})

function errorHandler(err, req, res, next){
  res.status(500);
  res.render('error', {error:err});
}

app.use(errorHandler);


var port = process.env.port || 5000;
http.listen(port, function(){
    console.log('Running @ port :' , port)
});
