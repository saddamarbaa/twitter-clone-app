/** @format */

// Selectors
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Scroll to top logic
const scrollToTop = () => {
	// Scroll to top logic
	rootElement.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

// EventListener
scrollToTopBtn.addEventListener("click", scrollToTop);

// Retrieve Twitter Data from API
const getTwitterData = () => {
	const URL = "http://localhost:3000/api/tweet/search?q=coding&count=15";
	fetch(URL)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data.result.statuses);
		})
		.catch((error) => {
			console.log(error);
		});
};

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

window.onload = () => {
	getTwitterData();
};
