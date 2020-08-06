//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

let posts=[];

const homeStartingContent = "Here you can see all Daily tech  journal .";
const aboutContent = "This website created as project. To know more please click on the below link";
const contactContent = " Drop us line ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get('/', function(req, res) {

  res.render("home",{demodata:homeStartingContent,
  posts:posts
  });
})
app.get('/about', function(req, res) {
  res.render("about",{demoAboutContent:aboutContent});
})
app.get('/contact', function(req, res) {
  res.render("contact",{demoContactContent:contactContent});
})
app.get('/compose', function(req, res) {
 
  res.render("compose");
});
app.post('/compose', function(req, res) {
  // let publish=req.body.publish;
  // let postBody=req.body.postBody;
  const post={
  title:req.body.publish,
   content:req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
  
});
app.get('/posts/:postName',function(req,res){
  reqiredvalue=_.lowerCase(req.params.postName);
  posts.forEach(function(post){
   stortedvalue=post.title;
   stortedvalue=_.lowerCase(stortedvalue)

   if(stortedvalue===reqiredvalue){
    res.render('post',{title:post.title,content:post.content})
   }
  });
 
})









app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
