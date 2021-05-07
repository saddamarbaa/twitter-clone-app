/** @format */

// Selectors
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const rootElement = document.documentElement;
const navIcon = document.getElementById("toggle");

// Scroll to top logic
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

const URL = "http://localhost:3000/tweets";

// Retrive Twitter Data from API
const getTwitterData = () => {};

//  Save the next page data
const saveNextPage = (metadata) => {};

// Handle when a user clicks on a trend
const selectTrend = (e) => {};

// Set the visibility of next page based on if there is data on next page
const nextPageButtonVisibility = (metadata) => {};

// Build Tweets HTML based on Data from API
const buildTweets = (tweets, nextPage) => {};

//  Build HTML for Tweets Images
const buildImages = (mediaList) => {};

// Build HTML for Tweets Video
const buildVideo = (mediaList) => {};
