/** @format */

// Selectors
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const URL = "http://localhost:3000/api/tweets";

// Scroll to top logic
const scrollToTop = () => {
	// Scroll to top logic
	rootElement.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

const onEnter = (event) => {
	if (event.key === "Enter") {
		getTwitterData();
	}
};

// Retrieve Twitter Data from API
const getTwitterData = () => {
	const query = document.getElementById("user-search-input").value;
	const encodedQuery = encodeURIComponent(query);
	const fulUrl = `${URL}/search?q=${encodedQuery}&count=10`;
	if (!query) return;

	fetch(fulUrl)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			buildTweets(data.result.statuses);
		})
		.catch((error) => {});
};

//  Save the next page data
const saveNextPage = (metadata) => {};

// Handle when a user clicks on a trend
const selectTrend = (e) => {};

// Set the visibility of next page based on if there is data on next page
const nextPageButtonVisibility = (metadata) => {};

// Build Tweets HTML based on Data from API
const buildTweets = (tweets, nextPage) => {
	tweets.map((tweet) => {
		let twitterContentEl = `
		<div class='tweets-list-container'>
			<div class='tweets-user-info'>
				<div class='image'></div>
				<div class='info'>
					<div class='name'>Coach | Saddam Arbaa</div>
					<div class='twitter-name'>@ArbaaSaddam</div>
				</div>

				<div class='tweets-user-info-add'>
					<i class='fas fa-ellipsis-h' title='More'></i>
				</div>
			</div>

			<div class='tweets-text-container'>
				<p>
				${tweet.full_text}
				</p>
			</div>

			<div class='tweets-images-container'>
				<div class='img'>
					<img src='./assets/img/s.png' alt='img' />
				</div>
			</div>
			<div class='tweets-date-container'>20 hours age</div>
			<div class='tweets-addtional-container'>
				<i title='Reply' class='far fa-comments reply'></i>
				<i title='share' class='fas fa-retweet'></i>
				<i title='Like' class='fas fa-heart'>
					&nbsp; &nbsp; ${tweet.user.followers_count}
				</i>
				<i title='Share' class='fas fa-share-alt'></i>
			</div>
		</div>
		`;
		document.getElementById(
			"tweets-list-container",
		).innerHTML += twitterContentEl;
	});
};

//  Build HTML for Tweets Images
const buildImages = (mediaList) => {};

// Build HTML for Tweets Video
const buildVideo = (mediaList) => {};

// EventListener
scrollToTopBtn.addEventListener("click", scrollToTop);
