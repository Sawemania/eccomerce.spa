fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((jsondata) => {
    console.log(jsondata);
    buildUI(jsondata);
    addEventsToButtons();
    localStorage.setItem("products", JSON.stringify(jsondata));
  });

function buildUI(productsArray) {
  //console.log("building UI with the data above!!!!");
  const productsSectionEl = document.getElementById("products");
  productsArray.forEach((product) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // child element

    let productImage = document.createElement("img");
    productImage.setAttribute("src", product.image);
    productImage.setAttribute("alt", product.title);

    let productTitle = document.createElement("h3");
    productTitle.textContent = product.title;

    let productCat = document.createElement("p");
    productCat.setAttribute("class", "category");
    productCat.textContent = product.category;

    let productDesc = document.createElement("p");
    productDesc.classList.add("description");
    productDesc.textContent = product.description.slice(0, 91) + "...";

    let actionDiv = document.createElement("div");

    let ProductPrice = document.createElement("p");
    ProductPrice.classList.add("price");
    ProductPrice.textContent = "KSH. " + product.price;

    let addToCartBtn = document.createElement("button");
    addToCartBtn, setAttribute("id", product.id + "-btn");
    addToCartBtn.classList.add("add-to-cart");
    addToCartBtn.textContent = "Add To Cart";

    // putting the element on the page
    actionDiv.append(ProductPrice);
    actionDiv.append(addToCartBtn);
    productDiv.append(productImage);
    productDiv.append(productCat);
    productDiv.append(productTitle);
    productDiv.append(productDesc);
    productDiv.append(actionDiv);

    // adding each product div into the section element
    productsSectionEl.append(productDiv);
  });
}

let cartlist = [];

function checkStorageForCartlist() {
  if (localStorage.getItem("cartlist")) {
    cartlist = JSON.parse(localStorage.getItem("cartlist"));
  }
}
checkStorageForCartlist();

//a function that adds event listeners to all add-to-cart buttons

function addEventsToButtons() {
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e.target);

      checkStorageForCartlist();
      let newCartItem = {
        id: e.target.id.split("-")[0],
        title:
          e.target.parentElement.parentElement.querySelector("h3").textContent,
        price: e.target.previousElementSibling.textContent,
        count: "",
      };
      cartlist.push(newCartItem);
      localStorage.setItem("cartlist", JSON.stringify());
      console.log(cartlist);
    });
  });
}

function updateCartCount() {
  checkStorageForCartlist();
  document.querySelector(".cart-count").textContent = cartlist.length;
}
updateCartCount();

document.getElementById("cart-icon").addEventListener("click", function () {
  document.getElementById("cart-display").classList.toggle("hidden");
  if(!document.getElementById("cart-display").classList.contains("hidden")){
    checkStorageForCartlist();
    populateCartDisplay(cartlist);
  }
});

function populateCartDisplay(list) {
  let unorderedList = document.getElementById("cart-output");
  list.forEach((product) => {
    let pLI = document.createElement("li");
    let pname = document.createElement("p");
    let pprice = document.createElement("p");
    pname.textContent = product.title;
    pprice.textContent = product.price;
    pLI.append(pname);
    pLI.append(pprice);
    unorderedList.append(pLI);
  });
}
