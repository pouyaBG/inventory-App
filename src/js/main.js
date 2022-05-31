// main class
import { CategoryView } from "./CategoryViwe.js";
import { ProductViwe } from "./ProductViwe.js";

document.addEventListener("DOMContentLoaded", () => {
  const category = new CategoryView();
  const product = new ProductViwe();
  //  give category and product to each other
  product.setProduct();
  category.setCategory();
  category.createCategoriesList();
  product.createProductsList(product.products);
});
