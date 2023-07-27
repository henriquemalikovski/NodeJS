'use strict'

const express = require('express')
const router = express.Router()
const controller = require("../controllers/index-controller");
const authService = require('../services/auth-service')

router.get('/', (req, res, next) => {
  res.status(200).send({
    title: "Node Store API",
    version: "0.0.1"
  })
})

router.post("/authenticate", controller.authenticate);
router.post("/refresh-token", authService.authorize, controller.refreshToken);

module.exports = router