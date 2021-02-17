// /** @format */

// const express = require("express");
// const Product = require("../models/ProductModel");
// const isAdmin = require("../utils/isAdmin");
// const isAuth = require("../utils/isAuth");

// const productRouter = express.Router();

// productRouter.get("/", async (req, res) => {
//   const products = await Product.find({});

//   res.send({ products });
// });

// productRouter.get("/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Product Not Found" });
//   }
// });

// productRouter.post("/", isAuth, async (req, res) => {
//   try {
//     const { title, price, description, image } = req.body.body;
//     const product = new Product({
//       title: title,
//       image: image,
//       price: price,
//       description: description,
//     });
//     const createdProduct = await product.save();
//     console.log("createdProduct:", createdProduct);
//     res.send({
//       _id: createdProduct._id,
//       title: createdProduct.title,
//       price: createdProduct.price,
//       description: createdProduct.description,
//     });
//   } catch (e) {
//     res.send({ Message: "Something went wrong" });
//   }
// });

// productRouter.put("/:id", isAuth, async (req, res) => {
//   const productId = req.params.id;
//   const product = await Product.findById(productId);
//   if (product) {
//     product.title = req.body.title;
//     product.price = req.body.price;
//     product.image = req.body.image;
//     product.description = req.body.description;
//     const updatedProduct = await product.save();
//     res.send({ message: "Product Updated", product: updatedProduct });
//   } else {
//     res.status(404).send({ message: "Product Not Found" });
//   }
// });

// productRouter.delete("/:id", isAuth, isAdmin, async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     const deleteProduct = await product.remove();
//     res.send({ message: "Product Deleted", product: deleteProduct });
//   } else {
//     res.status(404).send({ message: "Product Not Found" });
//   }
// });

// module.exports = productRouter;
