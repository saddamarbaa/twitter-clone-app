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
			const query = (document.getElementById("user-search-input").value =
				"");
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
	document.getElementById("tweets-list-container").innerHTML = "";
	tweets.map((tweet) => {
		const name = tweet.user.name;
		const twitterName = tweet.user.screen_name;
		const tweetTextContent = tweet.full_text;
		const userImage = tweet.user["profile_image_url"];

		let twitterContentEl = `

		<div class='tweets-list-container'>
			<div class='tweets-user-info'>
		<div class='image'	style="background-image: url(${userImage})">
				
				</div>
				<div class='info'>
					<div class='name'> ${name}</div>
					<div class='twitter-name'>@${twitterName}</div>
				</div>

				<div class='tweets-user-info-add'>
					<i class='fas fa-ellipsis-h' title='More'></i>
				</div>
			</div>

			<div class='tweets-text-container'>
				<p>
				${tweetTextContent}
				</p>
			</div>
			`;

		if (tweet.extended_entities && tweet.extended_entities.media.length > 0) {
			const tweetsImage = tweet.extended_entities.media[0].media_url;
			twitterContentEl += `
			<div class='tweets-images-container'>
			<div class='img'>
				<img src='${tweetsImage}' />
			</div>
		</div>`;
		}

		twitterContentEl += `
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
