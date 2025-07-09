import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.js";

const listElement = document.querySelector(".product-list");
const dataSource = new ProductData("tents");

const listing = new ProductList("Tents", dataSource, listElement);
listing.init();

// Checking out if there's a misplaced location. Found out that it is in recycle bin
