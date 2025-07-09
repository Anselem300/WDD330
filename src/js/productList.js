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

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // the dataSource will return a Promise...so you can use await to resolve it.
    const list = await this.dataSource.getData();
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
