require('dotenv').config()

const express = require('express')
const os = require('os')
const app = express()
const mysql = require('mysql')

app.get('/', (req, res) => res.send(`Hello world from ${os.hostname()}!`))

app.get('/time', (req, res) => {
    const connection = mysql.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
    })

    connection.connect()

    connection.query('SELECT NOW() AS cTime', (error, results) => {
        if (error) throw error
        res.send(`Current time is: ${results[0].cTime}`)
    })

    connection.end()
})

app.listen(8080)

