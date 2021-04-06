const express = require('express')
const cors = require('cors') ;
const bodyParser = require('body-parser') ;
require('dotenv').config() ;
const app = express()
app.use(cors()) ;
app.use(bodyParser.json()) 
const port = process.env.PORT || 8081
const MongoClient = require('mongodb').MongoClient;
const  ObjectID = require('mongodb').ObjectID ;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hsyzd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookCollection = client.db("bookStore").collection("books");
    const ordersCollection = client.db("bookStore").collection("orders");
    console.log('database connect')
    app.get('/bookList' , (req,res) =>{
        bookCollection.find({})
        .toArray((err ,data) => {
            res.send(data)
        })
    })
     
  });


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})