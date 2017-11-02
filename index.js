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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

var dbOptions = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'MMNTeam'
};

app.use(session({
  secret: '@pp Factori3',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 600000}
}))

app.use(flash());
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//setup handlebars
app.engine('hbs', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

//Make userID available in all templates / Creating Middleware ---------------
app.use(function(req, res, next){
  res.locals.currentUser = req.session.userID;
  next();
});

// Get Methods-----------------------
app.get("/", function(req, res, next){
  res.redirect("/home");
});
app.get("/home", function(req, res){
  res.render("home");
})
app.get("/login", function(req, res, next){
  res.render("login")
})
app.get("/page1", function(req, res){
  res.render("page1")
});
app.get("/page2", function(req, res){
  res.render("page2")
});
app.get("/page3", function(req, res){
  res.render("page3")
});
app.get("/page4", function(req, res){
  res.render("page4")
});
// Routed Views
app.get('/page5', page5.show);

// Delete the User session on logout
app.get("/logout", function(req, res){
  delete req.session.user;
  res.redirect("/login");
});

// Post Methods
app.post("/login", function(req, res, mext){

  if(req.body.username){
    var user =
    {
      inputName : req.body.username,
      inputPassword: req.body.password
    }

    if(user.inputName == "lee" && user.inputPassword == "123"){
          req.flash("warning", "Login Successful!");
          console.log("Success!");
          return res.render("home");
        }
        else if(user.inputName == "lee" && user.inputPassword != "123"){
          req.flash("warning", "Wrong Password");
          console.log("Wrong Password!");
          return res.redirect("/login");
        }
        else if(user.inputName != "lee"){
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


    // put username in session

});

function errorHandler(err, req, res, next){
  res.status(500);
  res.render('error', {error:err});
}

app.use(errorHandler);


var port = process.env.port || 3007;
http.listen(port, function(){
    console.log('Running @ port :' , port)
});
