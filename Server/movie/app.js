if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

const PORT = process.env.PORT || 3000
const URI = process.env.URI || 'mongodb://localhost:27017/Entertainme==>'

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(()=>{
        console.log(`success connent to mongodb`, URI);
    })
    .catch(()=>{
        console.log(`fail connect to mongodb`, URI);
    })

app.use('/', router)
app.use(errorHandler)


app.listen(PORT, () => console.log(`this app is listeing to port`, PORT))