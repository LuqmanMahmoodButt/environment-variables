const express = require('express')
require('dotenv').config()

const mongoose = require("mongoose")
const port = 3000
const Fries = require('./models/fries')
const fries = require('./models/fries')
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const path = require("path")

//! USE //

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")))
mongoose.connect(process.env.MONGODB_URI)


// ! GET REQUESTS // 

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/fries/:friesId', async (req, res) => {
    // i need to get the actual fries
    const fries = await Fries.findById(req.params.friesId)
    // send them back
    res.render('show.ejs', {
        fries,
    })
})

// tell express to expect some json in the request 
app.get('/add-fries', (req, res) => {
    res.render('new.ejs')
})

app.get('/fries', async (req, res) => {
    // i need to get the actual fries
    const fries = await Fries.find()
    // send them back
    res.render('fries.ejs', {
        fries: fries,
    })
})


app.get("/fries/:friesId/edit", async (req, res) => {
    const foundFries = await Fries.findById(req.params.friesId);
    res.render("edit.ejs", {
        fries: foundFries,
    });
});




//posting a new fry 

// ! POST REQUEST //

// tells express to expect data from our form
app.post("/fries", async (req, res) => {
    // 1) get the fry  from our request
    console.log(req.body)
    // 2) create the fry using mongoose
    const fries = await Fries.create(req.body)
    
    res.redirect('/fries')

    
})

// ! PUT REQUEST //

app.put("/fries/:friesId", async (req, res) => {

    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    
    await Fries.findByIdAndUpdate(req.params.friesId, req.body);
  
    res.redirect(`/fries/${req.params.friesId}`);
  });
  

app.put("/fries/:friesId", async (req, res) => {
    
    const fries = await Fries.findById(req.params.friesId)
    
    let updateFries = await Fries.updateOne(fries, req.body)
    
    res.send(updateFries)
})

app.put("/fries", async (req, res) => {
    
    const fries = await Fries.updateOne(req.body, { name: 'MCCAN' })
    
    res.send(fries)
})

// ! DELETE //

app.delete("/fries/:friesId", async (req, res) => {
    await Fries.findByIdAndDelete(req.params.friesId);
    res.redirect("/fries");
});

app.delete('/fries', async (req, res) => {

    const fries = await Fries.deleteOne(req.body)

    res.send(fries)
})

// ! LISTEN //

app.listen(port, () => {
    console.log('listening on port 3000')
    console.log(`Your secret is ${process.env.SECRET_PASSWORD}`);
    // console.log(`My mongo db url is ${process.env.MONGODB_URI}`);
})