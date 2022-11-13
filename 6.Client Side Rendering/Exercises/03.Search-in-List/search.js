import {html,render} from "./node_modules/lit-html/lit-html.js"
import { towns } from "./towns.js"

const root = document.getElementById("towns");
document.querySelector("button").addEventListener("click", search)
let counter = 0;

const addTowns = html 
`<ul>${towns.map(town => 
html `<li>${town}</li>`)}</ul>`

render(addTowns, root);

function search() {
   counter = 0;
   let text = document.getElementById("searchText").value;
   let towns = Array.from(document.querySelectorAll("li"));
   towns.forEach(town => {
      if(town.textContent.includes(text)){
         town.classList.add("active")
         counter++;
      }else {
         town.classList.remove("active");
      }
   })

   document.getElementById("result").textContent = `${counter} matches found`;
}
