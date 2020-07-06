const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const user = require('./api/objects/users.js')
const apiRouter = require('./apiRouter').router

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true
    })    
)

app.get('/', (req, res) => {
    //res.json({info: 'Node.js, Express, and Postgress API'})
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send('<h1>Bonjour sur mon serveur</h1>')
})


app.use('/api/', apiRouter)
/*app.get('/users', user.getUser)
app.get('/users/:id', user.getUserById)
app.post('/users', user.createUser)
app.delete('/users/:id', user.deleteUser)*/

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})