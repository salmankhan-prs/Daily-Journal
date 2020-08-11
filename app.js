//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user-name:<passsword>@cluster0.ovgok.mongodb.net/journalDB?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true} );




const postSchema ={ 
  title:String,
  content:String,
};
const Post=mongoose.model("Post",postSchema);

const homeStartingContent = "Here you can see all Daily tech  journal .";
const aboutContent = "This website created as project. To know more please click on the below link";
const contactContent = " Drop us line ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', function(req, res) {
Post.find({},function(err,posts) {
  res.render("home",{demodata:homeStartingContent,
    posts:posts
    });
})
  
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
  const post=new Post({
  title:req.body.publish,
   content:req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
 
  
});

app.get('/posts/:postId',function(req,res){
  requestedPostId=(req.params.postId);
  
  
  Post.findOne({_id: requestedPostId}, function(err, post){

    res.render("post", {
 
      title: post.title,
 
      content: post.content
 
    });
 
  });
 
 
})









app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
