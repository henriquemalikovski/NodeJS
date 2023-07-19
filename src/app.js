'use strict'

const DB_USER = "henrique"
const DB_PWD = "AZonrxXGqk2rMjiU"

const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const app = express()

const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PWD}@nodejs.sdyjehs.mongodb.net/?retryWrites=true&w=majority`)

const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

const indexRouter = require('../src/routes/index-router')
const productRouter = require('../src/routes/product-router')
const customerRouter = require('../src/routes/customer-router')
const orderRouter = require('../src/routes/order-router')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)

module.exports = app

