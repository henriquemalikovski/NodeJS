'use stritct'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.post = (req, res, next) => {
  var product = new Product(req.body)
  product.save()
    .then(x => {
      res.status(201).send({ mensage: "Produto cadastrado com sucesso!" })
    })
    .cath(e => {
      res.status(400).send({ mensage: "Falha ao cadastrar o produto", data: e })
    })

}


exports.put = (req, res, next) => {
  const id = req.params.id
  res.status(200).send({
    id: id,
    item: req.body
  })
}


exports.delete = (req, res, next) => {
  res.status(200).send(req.body)
}
