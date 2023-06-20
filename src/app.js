'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://henriquemalikovski:Cop27cop@nodejs.t0dzmch.mongodb.net/?retryWrites=true&w=majority')
const Product = require('./models/product')

const indexRouter = require('../src/routes/index-router')
const productRouter = require('../src/routes/product-router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/products', productRouter)

module.exports = app