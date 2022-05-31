import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");

export class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) {
      Toastify({
        text: "Please Fill in or Select all sections",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #1c456e, #c4160d)",
        },
      }).showToast();
    } else {
      Storage.saveCategory({ title, description }); //3 => 4
      this.categories = Storage.getAllCategories();
      // update DOM : update select option in categies
      this.createCategoriesList();
      categoryDescription.value = "";
      categoryTitle.value = "";
      Toastify({
        text: "Category added successfully",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #1c456e, #96c93d)",
        },
      }).showToast();
    }
  }
  setCategory() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-200">Select category</option>`;
    this.categories.forEach((element) => {
      result += `<option class="bg-slate-500 text-slate-200" value="${element.id}">${element.title}</option>`;
    });
    const categoryDom = document.getElementById("product-category");
    categoryDom.innerHTML = result;
  }
}
