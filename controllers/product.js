"use strict";

const Product = require("../models/product");

function getProduct(req, res) {
  const productId = req.params.productId;
  console.log(`Searching for product with ID: ${productId}`);

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      res.status(200).send({ product });
    })
    .catch((err) => {
      res.status(500).send({ message: `Error fetching product: ${err}` });
    });
}

function getProducts(req, res) {
  Product.find({})
    .then((products) => {
      if (!products) {
        return res.status(404).send({ message: "No existen productos" });
      }

      res.status(200).send({ products });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    });
}

function saveProduct(req, res) {
  console.log("POST /api/product");
  console.log(req.body);

  let product = new Product({
    name: req.body.name,
    picture: req.body.picture,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
  });

  product
    .save()
    .then((productStored) => {
      res.status(200).send({ product: productStored });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Error al salvar la base de datos ${err}` });
    });
}

function updateProduct(req, res) {
  let productId = req.params.productId;
  let update = req.body;

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err)
      res
        .status(500)
        .send({ message: `Error al actualizar el producto ${err}` });

    res.status(200).send({ product: productUpdated });
  });
}

function deleteProduct(req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al borrar el producto: ${err}` });

    if (!product)
      return res.status(404).send({ message: "Producto no encontrado" });

    product.remove((err) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al borrar el producto: ${err}` });

      res.status(200).send({ message: "El producto ha sido eliminado" });
    });
  });
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
};
