'use strict'

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

exports.authenticate = async (data) => {
  const res = await Customer.findOne({
    email: data.email,
    password: data.password
  })
  return res
}

exports.getById = async (data) => {
  const res = await Customer.findById({
    id: data.id
  })
  return res
}