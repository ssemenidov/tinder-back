import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Cards from './dbCards.js'
//App Config
const app=express();
const port=process.env.PORT ||8001

const connection_url='mongodb+srv://admin:9lVDLenqxs0mAdnr@cluster0.g1if2.mongodb.net/tinderdb?retryWrites=true&w=majority'
//Middlewares
app.use(express.json())
app.use(cors())
//DB config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Server start"));

//Api Endpoints
app.get('/', (req,res)=>res.status(200).send("hello Serge"))
app.post('/tinder/card',(req,res)=>{
    const dbCard=req.body;
    Cards.create(dbCard,(err,data)=>{
        if (err){
        
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data)
        }
    })
})
app.get('/tinder/card',(req,res)=>{
    const dbCard=req.body;
    Cards.find(dbCard,(err,data)=>{
        if (err){
            console.log(err);
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data)
        }
    })

})
//Listener
app.listen(port,()=>{
    console.log(`listen on localhost ${port}`);
})