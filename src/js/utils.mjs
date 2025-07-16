// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);

  try {
    return JSON.parse(data); // <-- this must return an array or null
  }
  catch (error) {
    return []; // <-- this must return an array or null
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
        const htmlStrings = list.map(templateFn);
        // if clear is true we need to clear out the contents of the parent.
        if(clear){
          parentElement.innerHTML = "";
        }
        parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback){
        parentElement.innerHTML = template;
        // if clear is true we need to clear out the contents of the parent.
        if(callback){
          callback(data);
        }
}

export async function loadTemplate(path){
  try{
    const response = await fetch(path);
    if(!response.ok){
      throw new Error(`HTTP error status: ${response.status}`)
    }
    const template = await response.text()
    return template;
  }catch(error){
    console.error("Error fetching data", error);
  }
}

export async function loadHeaderFooter(){
  // load header
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.getElementById("main-header");
  renderWithTemplate(headerTemplate, headerElement);

  // load footer
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}

