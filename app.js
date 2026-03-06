const formTarea = document.getElementById("formTarea");
const inputTitulo = document.getElementById("inputTitulo");
const selectTag = document.getElementById("selectTag");
const listaTareas = document.getElementById("listaTareas");

const inputBuscar = document.getElementById("inputBuscar");
const btnLimpiarBuscar = document.getElementById("btnLimpiarBuscar");

const statTotal = document.getElementById("statTotal");
const statVisibles = document.getElementById("statVisibles");
const statFavs = document.getElementById("statFavs");

const emptyState = document.getElementById("emptyState");

const filtros = document.querySelectorAll(".chip");

let filtroActivo = "all";

formTarea.addEventListener("submit", function(e){

  e.preventDefault();

  const titulo = inputTitulo.value.trim();
  const tag = selectTag.value;

  if(titulo === "") return;

  const li = document.createElement("li");

  li.className = "card";
  li.dataset.tag = tag;
  li.dataset.fav = "0";

  li.innerHTML = `
  <div class="card__head">
    <span class="badge">${tag}</span>
    <div class="actions">
      <button class="icon" data-action="fav">☆</button>
      <button class="icon" data-action="done">✓</button>
      <button class="icon danger" data-action="del">🗑</button>
    </div>
  </div>
  <p class="card__title">${titulo}</p>
  `;

  listaTareas.appendChild(li);

  inputTitulo.value = "";

  aplicarFiltros();

});

listaTareas.addEventListener("click", function(e){

  const accion = e.target.dataset.action;

  if(!accion) return;

  const card = e.target.closest(".card");

  if(accion === "del"){
    card.remove();
  }

  if(accion === "done"){
    card.classList.toggle("is-done");
  }

  if(accion === "fav"){

    if(card.dataset.fav === "0"){
      card.dataset.fav = "1";
      e.target.textContent = "★";
    }else{
      card.dataset.fav = "0";
      e.target.textContent = "☆";
    }

  }

  aplicarFiltros();

});

filtros.forEach(btn => {

  btn.addEventListener("click", () => {

    filtros.forEach(b => b.classList.remove("is-active"));

    btn.classList.add("is-active");

    filtroActivo = btn.dataset.filter;

    aplicarFiltros();

  });

});