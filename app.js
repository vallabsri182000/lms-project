const express = require("express");
const path = require("path");
const app = express();
require("./db/connect.js");
const Signup = require("./models/signup");
const Task = require("./models/task");
const { json } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"./public");
const template_path = path.join(__dirname,"./templates/views");
app.use('/images', express.static('./templates/views/images'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));




app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",template_path);



app.get("/",(req,res) =>{
    res.render("index")
});

app.get("/index",(req,res) =>{
    res.render("index")
});

app.get("/login",( req, res) =>{
    res.render("login");
});

app.get("/signup",( req, res) =>{
    res.render("signup");
});

app.get("/homepage",( req, res) =>{
    res.render("homepage");
});

app.get("/dashboard", ( req, res,next) => {
    
   Signup.find(function(err,signup){ 
            res.render("dashboard",{title:'signups', contents:signup})
        });
       
});

app.get("/course",( req, res) =>{
    res.render("course");
});

app.get("/task",( req, res) =>{
    res.render("task");
});

//create a new task
app.post("/task", async ( req, res) =>{
    try {
            const taskuser = new Task({
                myInput : req.body.myInput,
                date : req.body.date

            })

            const register = await taskuser.save();
            res.status(201).render("task");
        } catch (error) {
        res.status(400).send(error);
    }
});



// create a new user in our database
app.post("/signup", async ( req, res) =>{
    try {

        const psw = req.body.psw;
        const cpsw = req.body.cpsw;

        if(psw === cpsw){
            
            const signupuser = new Signup({
                fname : req.body.fname,
                lname : req.body.lname,
                email : req.body.email,
                cnum : req.body.cnum,
                psw : req.body.psw,
                cpsw : req.body.cpsw,
                img: req.body.photo

            })

            const registered  = await signupuser.save();
            res.status(201).render("index");

        } else{
            res.send("Passwords Are Not Matching");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

//Login Check

app.post("/login", async ( req, res) =>{
    try{

        const loemail = req.body.loemail;
        const passw = req.body.passw;

      const usermail  = await Signup.findOne({email:loemail});
      
      if(usermail.psw === passw){
          res.status(201).render("homepage");
      } else{
          res.send("Invalid Login Details");
      }
       

    } catch (error) {
        res.status(400).send("invalid Login Details");
    }
    
});

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});

