const express = require('express')
const cors = require('cors')

const app = express()

var corOptions = {
    origin: 'https://localhost:8081'
}

app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({
        message: 'hello from API'
    })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server already running on port : ${PORT}`)
})