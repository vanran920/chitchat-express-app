const express = require("express")

const app = express() 

const port = 8080

const path = require("path") 

app.use(express.json());

const { v4: uuidv4 } = require("uuid"); 

const methodOverride = require("method-override")


app.use(express.urlencoded( {extended: true })) 
app.use(methodOverride('_method'))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.use(express.static(path.join(__dirname, "public")))

app.listen(port , () => {
    console.log("Listening to a port : 8080")
})   

let posts = [
    {
        id: uuidv4(),
        username : "CodingSchool",
        content : "I Love Coding!",
    },
    {
        id: uuidv4(),
        username : "Vansh Rana",
        content : "My First Rest API Based Small Project",
    },
    {
        id: uuidv4(), 
        username : "Spiderman",
        content : "With Great Power Come , Great Responsibity",
    }
]

app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts})
}) 

app.get("/posts/new", (req,res) => {
    res.render("new.ejs")
})  

app.post("/posts", (req,res) => {
    let {username, content} = req.body
    posts.push({ id: uuidv4(), username, content });
    res.redirect("/posts") // If I submit, the form now then it directly open, the all posts page. 
}) 

app.get("/posts/:id", (req,res) => {
    let {id} = req.params
    let post = posts.find( (p) => id === p.id ) // It is searching the post with given id.
    res.render("show.ejs", { post })
})


app.get("/posts/:id/edit", (req,res) => {
     let {id} = req.params 
     let post = posts.find( (p) => id === p.id );
     res.render("edit.ejs", {post});
})

//Working on update post part
app.patch("/posts/:id", (req,res) => {
    let {id} = req.params 
    let newContent = req.body.content 
    let post = posts.find( (p) => id === p.id );
    post.content = newContent
    console.log(post)
    res.redirect("/posts") // If I submit, the form now then it directly open, the all posts page. 
}) 

app.delete("/posts/:id", (req,res) => {
    let {id} = req.params 
    posts = posts.filter((p) => id !== p.id ); // All non delted post , will store in a posts. 
     res.redirect("/posts") // If I submit, the form now then it directly open, the all posts page.
})