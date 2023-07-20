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
      email: customer.email,
      name: customer.name
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