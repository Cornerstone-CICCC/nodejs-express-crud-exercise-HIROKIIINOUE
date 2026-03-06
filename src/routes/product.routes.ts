import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../types/product.types";

let products: Product[] = [];
const productRouter = Router();

productRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(products);
});

productRouter.post(
  "/",
  (req: Request<{}, {}, Omit<Product, "id">>, res: Response) => {
    const { product_name, product_description, product_price } = req.body;
    if (!product_name.trim() || !product_description.trim() || !product_price) {
      res.status(400).json({
        message: "Missing Values",
      });
      return;
    }

    const newProduct: Product = {
      id: uuidv4(),
      product_name,
      product_description,
      product_price,
    };
    products = [...products, newProduct];
    res.status(201).json(newProduct);
  },
);

productRouter.get("/:id", (req: Request, res: Response) => {
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

productRouter.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { product_name, product_description, product_price } = req.body;
  if (!id) {
    res.status(404).json({
      message: "Update error",
    });
  }
  const foundIndex = products.findIndex((product) => product.id === id);
  products[foundIndex] = {
    ...products[foundIndex],
    product_name,
    product_description,
    product_price,
  };

  res.status(200).json(products[foundIndex]);
});

productRouter.delete("/:id", (req: Request, res: Response) => {
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

export default productRouter;
