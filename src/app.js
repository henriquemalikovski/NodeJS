'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const config = require('./config')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(config.connectionString)

const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

const indexRouter = require('../src/routes/index-router')
const productRouter = require('../src/routes/product-router')
const customerRouter = require('../src/routes/customer-router')
const orderRouter = require('../src/routes/order-router')


app.use(bodyParser.json({
  limit: '5mb'
}))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.use('/', indexRouter)
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)

module.exports = app

