"use strict";

const poster = document.querySelector("header img");
const filmsBlock = document.querySelector("#films");
const form = document.querySelector("#add");
const signInModalBtn = document.querySelector("[data-in]");
const signInModal = document.querySelector("[data-in-modal]");
const mobileMenu = document.querySelector("#mobileMenu");
const modalMenu = document.querySelector(".modal_menu");


// տնայինի ակտիվ կլասս "modal_wrapper-active"
const _DB = {
	movies: [
		"Logan", "Spider-Man","The Seven Samurai",
		"Bonnie and Clyde", "Reservoir Dogs", "Doctor Zhivago",
		"The Deer Hunter", "Rocky", "Crid"
	]
};
function init () {
	document.querySelectorAll("#main_promo .mp").forEach(adv => adv.remove());
	poster.src = "img/bg2.jpg";
	if (poster.src.slice(31) === "bg1.jpg") {
		poster.alt = "Gemini Man";
	} else {
		poster.alt = "Hitman's Wife's Bodyguard";
	}
	document.title = poster.alt;
}
init();
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const val = e.target.firstElementChild.value.trim();
	const check = document.querySelector("input[name='favorite']");
	
	if (val !== "" && val !== undefined && val.charAt(0) !== "<" && val.charAt(0) !== ">" && val !== "?" && val.charAt(0) !== "/") {
		if (check.checked) {
			console.log(`This film <${val}> added to favorite`);
		}

		_DB.movies.push(val);
	}
	setSort(_DB.movies)
	createFilmsList(_DB.movies, filmsBlock);
	e.target.reset();
});
function setSort (arr) {
	arr.sort()
}
function createFilmsList (films, parent) {
	parent.innerHTML = "";
	setSort(films);
	films.forEach((film, index) => {
		parent.innerHTML += `
			<p>
				${index + 1}. ${film.length >= 21 ? film.slice(0, 21)+'...' : film}
				<span data-rm>&#128465</span>
			</p>
		`;
	});

	removeFilmFromList('[data-rm]')
}
function removeFilmFromList(selector) {
	setSort(_DB.movies);
	document.querySelectorAll(selector).forEach((btn, index) => {
		btn.addEventListener("click", () => {
			btn.parentElement.remove();
			_DB.movies.splice(index, 1);
			createFilmsList(_DB.movies, filmsBlock);
		});
	});
}
createFilmsList(_DB.movies, filmsBlock);

signInModalBtn.addEventListener("click",function(e){
	e.preventDefault()
	signInModal.classList.add("modal_wrapper-active")
	const body = document.querySelector("body")
	body.style.position = "fixed"
})

window.addEventListener("mouseup",function(e){
	if(!e.target.matches("input.modal") && !e.target.matches("button.modal") && !e.target.matches("h2.modal") && !e.target.matches("form.modal")){
		signInModal.classList.remove("modal_wrapper-active")
	}
})

mobileMenu.addEventListener("click",function(e){
	modalMenu.classList.add("modal_wrapper-active-menu")
	const body = document.querySelector("body")
	body.style.position = "fixed"
	
})
window.addEventListener("mouseup",function(e){
	if(!e.target.matches("div.modal_menu") && !e.target.matches("div.sDivs") && !e.target.matches("p.para") && !e.target.matches("div.mMenu")){
	modalMenu.classList.remove("modal_wrapper-active-menu")
	
	}
})