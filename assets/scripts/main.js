/** @format */

// Selectors
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const rootElement = document.documentElement;
const navIcon = document.getElementById("toggle");

// Functions
const scrollToTop = () => {
	// Scroll to top logic
	rootElement.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

const toggleBetweenClass = () => {
	document.getElementById("header-nav").classList.toggle("show");
};

// EventListener
scrollToTopBtn.addEventListener("click", scrollToTop);
navIcon.addEventListener("click", toggleBetweenClass);
