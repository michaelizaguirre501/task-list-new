const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000

let db,
    dbConnectionStr = 'mongodb+srv://michaelizaguirre:OeLoN11gbId0wRSrRKuQ@cluster0.qapjw.mongodb.net/task-list?retryWrites=true&w=majority',
    dbName = 'task-list'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
            .then(client =>{
                console.log(`Connected to ${dbName} Database`)
                db = client.db(dbName)
                const taskCollection =db.collection('tasks')
            })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/',(request, response)=>{
    db.collection('tasks').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})
app.post('/addTask', (request, response) => {
    db.collection('tasks').insertOne(request.body)
    .then(result => {
        console.log('Task Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})




app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})