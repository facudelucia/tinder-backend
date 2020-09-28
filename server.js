const express = require("express")
const mongoose = require("mongoose")
const Cards = require("./dbCards")
const cors = require("cors");

const app = express()
const port = process.env.PORT || 8001
const connection_url = "mongodb+srv://facudelucia:QkxkSxXdXzL1csnW@cluster0.4eukj.mongodb.net/<dbname>?retryWrites=true&w=majority"


app.use(express.json())
app.use(cors())
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})


app.get("/", (req,res)=>res.status(200).send("hola mundo"))

app.post("/tinder/cards", (req,res)=>{
    const dbCard = req.body
    Cards.create(dbCard, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get("/tinder/cards", (req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})
app.listen(port, ()=>console.log(`app running on port: ${port}`))
