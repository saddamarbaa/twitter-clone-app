/** @format */

window.onload = () => updateNotifications();
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const rootElement = document.documentElement;

let API_URL = "http://localhost:3000";

if (location.href.indexOf("netlify") != -1) {
	API_URL = "https://twitter-clone-app-saddam.herokuapp.com";
}

let URL = `${API_URL}/api/search`;
let nextPageUrl = null;

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

const onEnter = (event) => {
	if (event.key === "Enter") {
		updateNotifications();
		getTwitterData();
	}
};

// Retrieve Twitter Data from API
const getTwitterData = (nextPageBoolean) => {
	let query = document.getElementById("user-search-input").value;
	if (nextPageUrl || nextPageBoolean) query = "coding";
	if (!query) return;

	const encodedQuery = encodeURIComponent(query);
	let fulUrl = `${URL}/search?q=${encodedQuery}&count=10`;
	if (nextPageUrl && nextPageBoolean) fulUrl = nextPageUrl;

	fetch(fulUrl)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			updateNotifications();
			const query = (document.getElementById("user-search-input").value =
				"");

			buildTweets(data.result.statuses, nextPageBoolean);

			saveNextPage(data.result.search_metadata);
			nextPageButtonVisibility(data.result.search_metadata);
		})
		.catch((error) => {});
};

// Save the next page data
const saveNextPage = (metadata) => {
	if (metadata.next_results) {
		nextPageUrl = `${URL}/search${metadata.next_results}`;
	} else {
		nextPageUrl = null;
	}
};

// Handle next page
const onNextPage = () => {
	if (nextPageUrl) {
		getTwitterData(true);
	}
};

// Handle when a user clicks on a trend
const selectTrend = (e) => {
	let selectedTrend = e.innerText;
	if (selectedTrend[0] === "#") {
		selectedTrend = selectedTrend.substring(1);
	}
	document.getElementById("user-search-input").value = selectedTrend;
	getTwitterData();
};

// Set the visibility of next page based on if there is data on next page
const nextPageButtonVisibility = (metadata) => {
	if (metadata.next_results) {
		document.querySelector(".next-page-conatiner").style.display = "flex";
	} else {
		document.querySelector(".next-page-conatiner").style.display = "none";
	}
};

// Build Tweets HTML based on Data from API
const buildTweets = (tweets, nextPageBoolean = false) => {
	document.getElementById("tweets-list-container").innerHTML = "";
	let twitterContentEl = "";
	tweets.map((tweet) => {
		const createdDate = moment(tweet.created_at).fromNow();
		const name = tweet.user.name;
		const twitterName = tweet.user.screen_name;
		const tweetTextContent = tweet.full_text;
		const userImage = tweet.user["profile_image_url_https"];

		twitterContentEl += `
		<div class='tweets-list-container'>
			<div class='tweets-user-info'>
		  <div class='image' style="background-image: url(${userImage})">
				
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

		if (
			tweet.extended_entities &&
			tweet.extended_entities.media &&
			tweet.extended_entities.media.length > 0
		) {
			twitterContentEl += buildImages(tweet.extended_entities.media);
			twitterContentEl += buildVideo(tweet.extended_entities.media);
		}

		twitterContentEl += `
			<div class='tweets-date-container'>${createdDate}</div>
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

		let htmlTweetContentEl = document.getElementById("tweets-list-container");

		if (nextPageBoolean) {
			htmlTweetContentEl.innerHTML += twitterContentEl;
		} else {
			htmlTweetContentEl.innerHTML = twitterContentEl;
		}
	});
};

// Build HTML for Tweets Images
const buildImages = (mediaList) => {
	let imagesContent = `<div class='tweets-images-container'>`;
	let imagesExist = false;
	mediaList.map((media) => {
		if (media.type == "photo") {
			imagesExist = true;
			imagesContent += `<div class='img'>
				<img src='${media.media_url_https}'
				 
				alt="img"
				loading="lazy"
				 />
				
			</div>`;
		}
	});
	imagesContent += `</div>`;
	return imagesExist ? imagesContent : "";
};

// Build HTML for Tweets Video
const buildVideo = (mediaList) => {
	let videoContent = `<div class='tweets-images-container tweet-video-container'>`;
	let videoExists = false;
	mediaList.map((media) => {
		if (media.type == "video" || media.type == "animated_gif") {
			videoExists = true;
			const video = media.video_info.variants.find(
				(video) => video.content_type == "video/mp4",
			);
			const videoOptions = getVideoOptions(media.type);
			videoContent += `
            <video ${videoOptions} ">
                <source src="${video.url}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            `;
		}
	});
	videoContent += `</div>`;
	return videoExists ? videoContent : "";
};

const getVideoOptions = (mediaType) => {
	if (mediaType == "animated_gif") {
		return "loop autoplay";
	} else {
		return "controls";
	}
};

// Random notifications
const updateNotifications = () => {
	const notifications = document.querySelector("#notifications");
	notifications.dataset.progress = Math.floor(Math.random() * 20 + 1);
};
