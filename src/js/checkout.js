import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const item1Price = 349.99;
const item1Qty = 4;
const item2Price = 199.90;
const item2Qty = 1;
const taxRate = 0.06;

const subtotal = (item1Price * item1Qty) + (item2Price * item2Qty);
const tax = subtotal * taxRate;

// Total items = 4 + 1 = 5
const totalItems = item1Qty + item2Qty;
const shipping = 10 + (totalItems - 1) * 2;

// Final Total
const total = subtotal + tax + shipping;

// Render to DOM
document.getElementById("subtotal").innerHTML = `${subtotal.toFixed(2)}`;
document.getElementById("tax").innerHTML = `${tax.toFixed(2)}`;
document.getElementById("shipping").innerHTML = `${shipping.toFixed(2)}`;
document.getElementById("sum-total").innerHTML = `${total.toFixed(2)}`