import express from 'express'

const app = express()
const port = 3000

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
    const {name, age} =  req.body
    const newStud = {id:nextId++, name, age}
    studData.push(newStud)
    res.status(201).send(newStud)
})

//get all students
app.get('/student', (req,res) => {
    res.status(200).send(studData)
})

// find student
app.get('/student/:id', (req,res) => {
    const stud = studData.find(s => s.id === parseInt(req.params.id))
    if(!stud){
        return res.status(404).send('Student Not Found')
    }
    res.status(200).send(stud)
})


//update student data
app.put('/student/:id', (req,res) => {
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