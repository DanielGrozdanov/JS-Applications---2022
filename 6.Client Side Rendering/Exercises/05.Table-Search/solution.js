import { get } from './api.js';
import { html, render } from "./node_modules/lit-html/lit-html.js"
const root = document.querySelector("tbody");

async function solve() {
   let data = await get();
   let frag = document.createDocumentFragment();
   frag = html
   `${data.map(student => html`
   <tr>
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
   </tr>
   `)}
   `;
   render(frag, root)

document.querySelector('#searchBtn').addEventListener('click', onClick);


   function onClick() {
      let searchField = document.getElementById("searchField");
      let textInf = searchField.value.trim();
      [...root.children]
       .forEach(th=> {
         let rowInf = [...th.children].map(el => el.textContent).join(' ');
         
         rowInf.toLowerCase().includes(textInf.toLowerCase()) ? th.setAttribute('class', "select") : th.removeAttribute("class", "select")
       });

       debugger
      searchField.value = ' ';
   }
}

solve();