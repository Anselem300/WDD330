import ProductData from "./ProductData.mjs";
import { ProductList } from "./ProductData.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listElement = document.querySelector(".product-list");
const dataSource = new ProductData("tents");

const listing = new ProductList("Tents", dataSource, listElement);
listing.init();

loadHeaderFooter();
