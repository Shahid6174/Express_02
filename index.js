import 'dotenv/config'
import express from 'express'
import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";


const app = express()
const port = process.env.PORT || 3000
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );



// app.get("/", (req,res) => {
//     res.send("Hello from Shahid!")
// })
// app.get("/home", (req,res) => {
//     res.send("Hello from Shahid! Welcome to Home Page")
// })
// app.get("/about", (req,res) => {
//     res.send("Hello from Shahid! Welcome to About Page")
// })


app.use(express.json())

let studData = []
let nextId = 1

//add a student
app.post('/student', (req,res) => {
    // console.log("Student with ",nextId, " added");
    const {name, age} =  req.body
    const newStud = {id:nextId++, name, age}
    studData.push(newStud)
    res.status(201).send(newStud)
})

//get all students
app.get('/student', (req,res) => {
    // console.log("Students Displayed");
    res.status(200).send(studData)
})

// find student
app.get('/student/:id', (req,res) => {
    // console.log("Student with ",req.params.id, " displayed");
    const stud = studData.find(s => s.id === parseInt(req.params.id))
    if(!stud){
        return res.status(404).send('Student Not Found')
    }
    res.status(200).send(stud)
})


//update student data
app.put('/student/:id', (req,res) => {
    // console.log("Student with ",req.params.id, " updated");
    const stud = studData.find(s => s.id === parseInt(req.params.id));
    if(!stud){
        return res.status(404).send('Student Not Found')
    }
    const {name, age} = req.body
    stud.name = name
    stud.age = age
    res.status(200).send(stud)
})

//delete student data
app.delete('/student/:id', (req,res) => {
    // console.log("Student with ",req.params.id, " deleted");
    const index = studData.findIndex(s => s.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('Student Not Found')
    }
    const name = studData.find(s => s.id === parseInt(req.params.id)).name; 
    studData.splice(index, 1)
    res.status(200).send("deleted " + name)
})

app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
})