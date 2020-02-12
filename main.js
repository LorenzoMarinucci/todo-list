!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="dist",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=function(e){return e.name||(e.name="My Project"),{todos:[],name:e.name,description:e.description}};var o=function(e){return{name:e.name,priority:e.priority,dueDate:e.dueDate,description:e.description,done:!1}};var d=function(){const e=function(e,t){return t.todos.length>0&&t.todos.forEach((t,n)=>{let r=document.createElement("div");r.classList.add("todo"),r.setAttribute("data-index",n);let o=document.createElement("div");o.classList.add("todoHeader");let d,i=document.createElement("h3");switch(t.priority){case"High":d="red";break;case"Low":d="green";break;case"Medium":d="yellow";break;default:d="grey"}i.innerHTML=`<span class="dot ${d}"></span> ${t.name}`,o.appendChild(i);let a=document.createElement("div");a.classList.add("buttons");let c=t.done?' checked="checked"':"";a.innerHTML=`<label class="container"><input type="checkbox"${c} /><span class="checkmark"></span></label><div class="todoOptions"><img class="edit" src="images/edit.png" /><img class="delete" src="images/delete.png" /></div></div><i class="down" class="showTodo"></i>`,o.appendChild(i),o.appendChild(a);let l=document.createElement("h4");l.textContent=`Due: ${t.dueDate}`;let s=document.createElement("h4");s.textContent=`Priority: ${t.priority}`;let u=document.createElement("p");return u.classList.add("description"),u.textContent=t.description,r.appendChild(o),r.appendChild(l),r.appendChild(s),r.appendChild(u),e.appendChild(r)}),e};return{renderProjects:function(e,t){for(;e.firstChild;)e.firstChild.remove();t.forEach((t,n)=>{let r=document.createElement("h2");r.textContent=`${t.name}`;let o=document.createElement("div");o.classList.add("project"),o.setAttribute("data-index",n),o.appendChild(r),e.appendChild(o)})},renderTodosContainer:function(t,n){let r=document.createElement("div");r.id="todosHeader";let o=document.createElement("h2");o.textContent=`${n.name}`,r.appendChild(o);let d=document.createElement("p");d.id="projectDescription",d.textContent=n.description,r.appendChild(d);let i=document.createElement("div");i=e(i,n),i.id="todoList";let a=document.createElement("div"),c=document.createElement("button");c.textContent="Edit Project";let l=document.createElement("button");l.textContent="Delete Project";let s=document.createElement("button");s.textContent="Add Todo",c.id="editProject",l.id="deleteProject",s.id="addTodo",a.appendChild(c),a.appendChild(l),a.appendChild(s),a.id="projectButtons",t.appendChild(r),t.appendChild(document.createElement("hr")),t.appendChild(i),t.appendChild(document.createElement("hr")),t.appendChild(a)},renderTodos:e,showProjectForm:()=>{let e=document.querySelector("body"),t=document.createElement("div");t.id="formBackground",t.innerHTML='<div id="projectForm">        <form action="">          <label for="name">Project name</label>          <input type="text" id="name" />          <label for="description">Project description</label>          <textarea id="description"></textarea>        </form>        <div id="projectFormButtons">          <button id="cancelSubmition">Cancel</button>          <button id="submitProject">Submit</button>        </div>      </div>',e.appendChild(t)},deleteForm:()=>{let e=document.getElementById("formBackground");e.parentElement.removeChild(e)},fetchProjectData:()=>{const e=document.querySelector("form");return{name:e.querySelector("#name").value,description:e.querySelector("#description").value}}}}();const i=document.getElementById("projectList"),a=document.getElementById("todosContainer"),c=document.getElementById("addProject");let l,s,u=[];function p(e){if(!e.parentNode.hasAttribute("selected")){for(l.toggleAttribute("selected"),l=e,l.toggleAttribute("selected"),s=l.getAttribute("data-index");a.firstChild;)a.firstChild.remove();d.renderTodosContainer(a,u[s])}}window.addEventListener("load",()=>{u.push(r({name:"Default",description:"Just testing"})),u.push(r({name:"Asdf",description:"Whatever"})),u[0].todos.push(new o({name:"Asdd",priority:"High",dueDate:"2/2/20",description:"arre"})),u[0].todos.push(new o({name:"Correr",priority:"Low",dueDate:"2/2/20",description:"Salir a correr"})),u[1].todos.push(new o({name:"Correr",priority:"Medium",dueDate:"2/2/20",description:"Salir a correr"})),u[1].todos.push(new o({name:"Nada",priority:"None",dueDate:"2/2/20",description:"Salir a correr"})),u.push(r({name:"",description:""})),d.renderProjects(i,u),document.querySelectorAll(".project").forEach(e=>e.addEventListener("click",e=>p(e.parentNode))),u.length>0&&(l=document.querySelector(".project"),l.toggleAttribute("selected"),s=parseInt(l.getAttribute("data-index")),d.renderTodosContainer(a,u[s]))}),c.addEventListener("click",()=>{d.showProjectForm()}),document.addEventListener("click",e=>{if(e.target)switch(e.target.id){case"cancelSubmition":d.deleteForm();break;case"submitProject":u.push(r(d.fetchProjectData())),d.renderProjects(i,u),p(document.querySelectorAll(".project:last-child")[0]),d.deleteForm();break;default:e.target.parentNode.classList.contains("project")&&p(e.target.parentNode)}})}]);