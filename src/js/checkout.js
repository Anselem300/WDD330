import { loadHeaderFooter } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";

loadHeaderFooter();

const item1Price = 349.99;
const item1Qty = 4;
const item2Price = 199.9;
const item2Qty = 1;
const taxRate = 0.06;

const subtotal = item1Price * item1Qty + item2Price * item2Qty;
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
document.getElementById("sum-total").innerHTML = `${total.toFixed(2)}`;

// export default class CheckoutProcess {
//     constructor(formSelector){
//         this.form = document.querySelector(formSelector);
//         this.ProductData = new ProductData();

//         this.form.addEventListner("submit", (e) = this.checkout(e));
//     }

//     checkout(event){
//         event.preventDefault(); // Prevent actual form submission

//         // Gather form data
//         const formData = new formData(this.form);
//         const data = {
//           firstName: formData.get("firstname"),
//           lastName: formData.get("lastname"),
//           street: formData.get("street"),
//           city: formData.get("city"),
//           state: formData.get("state"),
//           zip: formData.get("zip"),
//           cardNumber: formData.get("cardNumber"),
//           expDate: formData.get("expDate"),
//           securityCode: formData.get("securityCode"),
//         };

//         // Send to external service
//         this.externalServices.processOrder(data);

//     }
// }

// Usage in your checkout/index.js (or similar):
// import CheckoutProcess from "./CheckoutProcess.js";

// document.addEventListener("DOMContentLoaded", () => {
//   new CheckoutProcess("#checkout"); // attach to your form
// });
