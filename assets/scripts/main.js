/** @format */

// Selectors
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const URL = "http://localhost:3000/api/tweets";

// random notifications
window.onload = () => {
	const notifications = document.querySelector("#notifications");
	notifications.dataset.progress = Math.floor(Math.random() * 20 + 1);
};

// alert(Math.floor(Math.random() * 10));

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
		const createdDate = moment(tweet.created_at).fromNow();
		const name = tweet.user.name;
		const twitterName = tweet.user.screen_name;
		const tweetTextContent = tweet.full_text;
		const userImage = tweet.user["profile_image_url_https"];

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

		document.getElementById(
			"tweets-list-container",
		).innerHTML += twitterContentEl;
	});
};

//  Build HTML for Tweets Images
const buildImages = (mediaList) => {
	let imagesContent = `<div class='tweets-images-container'>`;
	let imagesExist = false;
	mediaList.map((media) => {
		if (media.type == "photo") {
			imagesExist = true;
			imagesContent += `<div class='img'>
				<img src='${media.media_url_https}' />
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
