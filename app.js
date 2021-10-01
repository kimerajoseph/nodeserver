const express = require("express");
const request = require("request");
const cors = require("cors")
const PORT = 5000;
//import bodyParser = require("body-parser");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
//const mongoose = require('mongodb').MongoClient;

const { response } = require("express");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const data = require("./data");
//const { db } = require("./Equipment");
require('./Equipment')
require('./activeCustomer')
require('./Customer')
const Equipment = mongoose.model("Equipment")
const activeCustomer = mongoose.model("activeCustomer")
const Customer = mongoose.model("Customer")

//require('mongoose').model('Equipment').schema.add({quantity:Number,});

//Initialise server/app
let app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
//INITIALIZING CORS 
app.use(cors());

// mongodb: 'mongodb://c666:buyaokan###@ccav.com:27017/zh_db',
// mongodb: 'mongodb://' + encodeURIComponent('c666:buyaokan###') + '@ccav.com:27017/zh_db',


//const mongoUri = "mongodb+srv://dbUser:energy%38Tech%61%36@cluster0.1wd5p.mongodb.net/enerSolAppDb?retryWrites=true&w=majority";
const mongoUri = "mongodb+srv://josephkimera:%24TechsUrvyBb%23@cluster0.6hmmu.mongodb.net/appDB?retryWrites=true&w=majority"
const db = mongoose.connect(mongoUri,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
  console.log("connected to mongo yeahhh")
})
mongoose.connection.on("error",(err)=>{
  console.log("error",err)
}) 


const weather_uri = "http://api.weatherstack.com/current?access_key=b4d63333931beb87abce01ca6368f0fb&query=Kampala"


app.get("/api", (req, res) => {
  res.json(data);
  //console.log("WELCOME TO THE SERVER")
});
//const finalResult = []
app.get("/eqCountry",(req,res) =>{
  console.log("LOAD FUNCTION CALLED ")
  //console.log("THIS IS OUR RESULT ", finalResult)
  //await kimera()
  res.json(finalResult);  
})

//FUNCTION FOR EXECUTING QUERRIES AND RETURNING VALUES
// const kimera = async(query) =>{
//   console.log("FUNCTION KIMERA CALLED")
//   mongoose.connect(mongoUri, function(err, db) {  
//     if (err) throw err;     
//     db.collection("equipment").find(query).toArray(function(err, result) {  
//     if (err) throw err;  
//     console.log("THIS IS THE RESULT ", result);    
//     //db.close(); 
//     finalResult = result[0]
//     //console.log("THIS IS THE finalResult ", finalResult);  
//     return finalResult; 
//     }); 
//   }); 
// }

app.post("/newEquipment", (req, res) => {
    console.log("NEW EQUIPMENT AXIOS CALLED")
    const ourEquipment = new Equipment({
                category:req.body.category,
                origin: req.body.origin,
                capacity:req.body.capacity,
                yom: req.body.yom,
                warranty: req.body.warranty,
                cost: req.body.cost,
                quantity: req.body.quantity,
                technology: req.body.technology,               
                comments: req.body.comments,     
                
              })
        
         JSON.stringify(ourEquipment) 
         console.log("THIS IS THE EQUIPMENT",ourEquipment)

         mongoose.connect(mongoUri, function(err, db) {
          if (err) throw err;
          var timestamp = new Date() 
          //ourEquipment.Datetime = timestamp
          //console.log(ourEquipment)
    db.collection('equipment').insertOne(ourEquipment)
    .then(console.log("RECORD INSERTED AT ", timestamp))
        });
               
  });

 //NEW CUSTOMER SIGNUP
 app.post("/newCustomer", async(req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hasPassword =  await bcrypt.hash(req.body.password, salt)
  console.log("HASHED PASSWORD ", hasPassword)
  var ourTimestamp = new Date() 
  console.log("NEW CUSTOMER AXIOS CALLED")
  const ourCustomer = new Customer({
    surname:req.body.surname,
    lastName: req.body.lastName,
    otherNames:req.body.otherNames,
    username: req.body.username,
    gender: req.body.gender,
    DOB: req.body.DOB,
    country: req.body.country,
    city: req.body.city,               
    email: req.body.email,     
    phoneNumber: req.body.phoneNumber,
    password:hasPassword,
    confirmPassword:hasPassword,
    timestamp: ourTimestamp                    
            })
      
       JSON.stringify(ourCustomer)        
       console.log("THIS IS THE CUSTOMER",ourCustomer)
       mongoose.connect(mongoUri, function(err, db) {
        if (err) throw err;
  db.collection('customers').insertOne(ourCustomer)
  .then(console.log("RECORD INSERTED AT ", ourTimestamp))
      });
             
}); 
app.post('/selfHelpLoad', (req, res) =>{
    console.log("SELECTION HAS CALLED FUNCTION")
    // let myData=[{'kimera':31}]     
    const newReq = {
      myIdentifier: req.body.category,
      myValue: req.body.origin,
      //myTime:req.body.timeStamp,
    };
   console.log("OBJECT ", newReq)
    console.log("ORIGIN ", newReq.myValue)
    mongoose.connect(mongoUri, function(err, db) {  
      if (err) throw err;  
      var query = {origin:newReq.myValue};  
      const finalResult = kimera(query).then(        
        resp =>{
          ourResult = JSON.stringify(finalResult)
          //console.log("RESULT TYPE ", typeof(ourResult))
        res.json(ourResult) 
      })
      .catch(function (response) {
        //handle error
        console.log("WAITING FOR DATA")
    });     
})
})

app.post('/selfHelpLoad2', (req, res) =>{   
console.log("SELF HELP CALLED ")
var myCountry = req.body.country
console.log(myCountry) 
var query = {origin:myCountry};
mongoose.connect(mongoUri, function(err, db) {  
  if (err) throw err;     
  db.collection("equipment").find(query).toArray(function(err, result) {  
  if (err) throw err;  
  console.log("THIS IS THE RESULT ", result);    
  //db.close(); 
  finalResult = result[0]
  //console.log("THIS IS THE finalResult ", finalResult);  
  //return finalResult; 
  res.json(finalResult) 
  }); 
});
// const myResult = kimera()
// console.log("FINAL RESULT ", finalResult)
})

app.post('/countries', (req, res) =>{   
  console.log("COUNTRIES FXN CALLED ")
  var theCategory = req.body.category
  console.log(theCategory) 
  var query = {category:theCategory};
  mongoose.connect(mongoUri, function(err, db) {  
    if (err) throw err;     
    db.collection("equipment").find(query).toArray(function(err, result) {  
    if (err) throw err;  
    console.log("THIS IS THE RESULT ", result); 
    // var finalArray = []   
    // for(var i=0;i<result.length;i++){
    //   console.log("COUNTRY OF ORIGIN ",result[i].origin)
    //   finalArray.push(result[i].origin)
    // }
    // console.log(finalArray)
    res.json(result) 
    }); 
  });
  })

app.listen(PORT, function() {
         console.log("SERVER IS READY " + PORT);
     });