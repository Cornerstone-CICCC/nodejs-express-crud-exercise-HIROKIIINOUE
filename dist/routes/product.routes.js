"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
let products = [];
const productRouter = (0, express_1.Router)();
productRouter.get("/", (req, res) => {
    res.status(200).json(products);
});
productRouter.post("/", (req, res) => {
    const { product_name, product_description, product_price } = req.body;
    if (!product_name.trim() || !product_description.trim() || !product_price) {
        res.status(400).json({
            message: "Missing Values",
        });
        return;
    }
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name,
        product_description,
        product_price,
    };
    products = [...products, newProduct];
    res.status(201).json(newProduct);
});
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({
            message: "Unable to find todo item!",
        });
        return;
    }
    const product = products.filter((product) => product.id === id);
    res.status(200).json(product);
});
productRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { product_name, product_description, product_price } = req.body;
    if (!id) {
        res.status(404).json({
            message: "Update error",
        });
    }
    const foundIndex = products.findIndex((product) => product.id === id);
    products[foundIndex] = Object.assign(Object.assign({}, products[foundIndex]), { product_name,
        product_description,
        product_price });
    res.status(200).json(products[foundIndex]);
});
productRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({
            message: "Update error",
        });
    }
    const target = products.filter((product) => product.id === id);
    const newProducts = products.filter((product) => product.id !== id);
    products = [...newProducts];
    res.status(200).json(target);
});
exports.default = productRouter;
