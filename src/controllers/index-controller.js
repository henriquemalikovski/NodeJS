"use strict"

const repository = require('../repositories/index-repository')
const md5 = require('md5')
const authService = require('../services/auth-service')

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    })
    if (!customer) {
      res.status(404).json({
        message: 'Usuário ou senha inválido'
      })
      return
    }
    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles
    })
    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name
      }
    })
  } catch (e) {
    res
      .status(400)
      .send({ mensage: "Falha ao cadastrar o cliente", data: e })
  }
}

exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    const data = await authService.decodeToken(token)

    const customer = await repository.getById(data.id)
    if (!customer) {
      res.status(404).json({
        message: 'Cliente não encontrado'
      })
      return
    }
    const tokenData = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles
    })
    res.status(201).send({
      token: tokenData,
      data: {
        email: customer.email,
        name: customer.name
      }
    })
  } catch (e) {
    res
      .status(400)
      .send({ mensage: "Falha ao cadastrar o cliente", data: e })
  }
}