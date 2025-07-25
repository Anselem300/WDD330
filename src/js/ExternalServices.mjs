const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    
  }
  async getData(category) {
    try{
      const response = await fetch(`${baseURL}products/search/${category}`)
      if (!response.ok){
        throw new Error('HTTP Error status: ' + response.status);
      }
    const data = await convertToJson(response);
    return data.Result;
    } catch(error){
      console.error(`Error fetching data: ${error}`);
    }
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id); // Another way to write this is - function(item){
     // return item.id === id;
   // }
  }
}


import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Calculate the discount percentage if applicable
  let discountHTML = "";
  const retail = product.SuggestedRetailPrice;
  const sale = product.FinalPrice;

  if (retail && sale && retail > sale) {
    const discountPercent = Math.round(((retail - sale) / retail) * 100);
    const discountAmount = (retail - sale).toFixed(2);
    discountHTML = `<p class="product-card_discount">Save ${discountPercent}% ($${discountAmount})</p>`;
  }

  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2 class="card_brand">${product.Brand.Name}</h2>
        <h3 class="card_name">${product.Name}</h3>
        <p class="product-card_price">$${product.FinalPrice}</p>
        ${discountHTML}
      </a>
    </li>`;
}

export class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // the dataSource will return a Promise...so you can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    // next, render the list – ** future **
    this.renderList(list);
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}


import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init(){
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails(this.product);
        // the product details are needed before rendering the HTML
        this.renderProductDetails();
        // once the HTML is rendered, (1) add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        document.getElementById("addToCart").addEventListener("click", this.addProductTocart.bind(this));
    }

    addProductTocart(){
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails(){
        productDeatailsTemplate(this.product);
    }
}

function productDeatailsTemplate(product){
    document.querySelector("h2").textContent = product.brand.name;
    document.querySelector("h3").textContent = product.nameWithoutBrand;

    const productImage = document.getElementById("productImage");
    productImage.src = product.Image;
    productImage.alt = product.nameWithoutBrand;

    document.getElementById("productPrice").textContent = product.FinalPrice;
    document.getElementById("productColor").textContent = product.Colors[0].ColorName;
    document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.getElementById("addTocart").dataset.id = product.id;
}


// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }

// export default class ExternalServices {
//   processOrder(data) {
//     console.log("Order received:", data);
//     // Here you could send it to an API or simulate it with localStorage
//     // Example: fetch('/api/submit-order', { method: 'POST', body: JSON.stringify(data) })
//   }
// }
