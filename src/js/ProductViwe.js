import Storage from "./Storage.js";
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const prductCategory = document.querySelector("#product-category");

const length = document.getElementById("length");
const addNewProductBtn = document.querySelector("#add-new-product");
const searchInput = document.getElementById("search-input");
const sortProduct = document.getElementById("sort-product");
export class ProductViwe {
  constructor() {
    // first load
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProduct(e));
    sortProduct.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
    length.innerHTML = JSON.parse(localStorage.getItem("products")).length;
  }
  // add new product
  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = prductCategory.value;
    if (!title || !quantity || !category) {
      Toastify({
        text: "Please Fill in or Select all sections",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #1c456e, #c4160d)",
        },
      }).showToast();
    } else {
      Storage.saveProducts({ title, quantity, category });
      this.products = Storage.getAllProducts();
      this.createProductsList(this.products);

      Toastify({
        text: "Product added successfully",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #1c456e, #96c93d)",
        },
      }).showToast();
      length.innerHTML = JSON.parse(localStorage.getItem("products")).length;

      // title= "";
      // quantity = "";
      // category= "";
    }
  }
  // set a all products
  setProduct() {
    this.products = Storage.getAllProducts();
  }
  //  create Products List
  createProductsList(products) {
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      const options = {
        year: "numeric",
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      result += `
      <div class="flex items-center justify-between mb-2 w-full min-w-[400px]">
      <span class="text-slate-400">${item.title}</span>
      <div class="flex items-center gap-x-3">
      <span class="text-slate-400">${new Date().toLocaleDateString(
        "fa-IR",
        options
      )}</span>
        <span class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-full" id="edit">${
          selectedCategory.title
        }</span>
        <button id="edit-product" class=" border px-2 py-o.5 rounded-2xl border-green-800 text-green-800 data-product-id=${
          item.id
        } ">Edit</button>
        <span
        class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300">${
          item.quantity
        }</span>
        <button class="delete-product border px-2 py-o.5 rounded-2xl border-red-800 text-red-800" 
        data-product-id=${item.id}>Delete</button>
        </div>
      </div>`;
    });
    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;
    // delete product
    const deleteBtn = [...document.querySelectorAll(".delete-product")];
    deleteBtn.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProduct(e));
    });
  }
  // search in products
  searchProduct(e) {
    const searchValue = e.target.value.trim().toLowerCase();
    const searchResult = this.products.filter((item) => {
      return item.title.includes(searchValue);
    });
    this.createProductsList(searchResult);
  }
  // sorttd products by 1.new or 2.old
  sortProducts() {
    const sortValue = sortProduct.value;
    if (sortValue === "old") {
      this.createProductsList(
        this.products.sort((a, b) => {
          return a.id - b.id;
        })
      );
    } else if (sortValue === "new") {
      this.createProductsList(
        this.products.sort((a, b) => {
          return b.id - a.id;
        })
      );
    }
  }
  // delete product
  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    length.innerHTML = JSON.parse(localStorage.getItem("products")).length;
    Toastify({
      text: "Deleted successfully",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #c4160d, #1c456e)",
      },
    }).showToast();
  }
}
