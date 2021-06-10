/** @format */

// Call function whe the page is loaded
window.onload = () => fetchTweets();

const newPostForm = document.getElementById("newPostForm");

// Bearer Token
const Bearer = "Bearer " + localStorage.getItem("token");

if (location.href.indexOf("netlify") != -1) {
	API_URL = "https://twitter-clone-app-saddam.herokuapp.com";
}

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");
const secondClosingdBtn = document.getElementById("secondClosingdBtn");

// Get the <span> element that closes the modal
const closeSpan = document.getElementById("closeSpan");

// When the user clicks on the button, open the modal
btn.onclick = () => (modal.style.display = "block");

secondClosingdBtn.onclick = () => (modal.style.display = "block");

// When the user clicks on <span> (x), close the modal
closeSpan.onclick = () => {
	modal.style.display = "none";
	document.getElementById("form-post-content").value = "";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
		document.getElementById("form-post-content").value = "";
	}
};

// EventListeners
newPostForm.addEventListener("submit", (event) => {
	event.preventDefault();
	// // Build FormData
	// let formData = new FormData();
	// const content = document.getElementById("form-post-content").value;
	// const fileInputElement = document.getElementById("form-post-image");
	// formData.append("tweetImage", fileInputElement.files[0]);
	// formData.append("content", content);
	// submitNewTweet(formData);

	submitNewTweet(true);
});

// function to get the tweets
const fetchTweets = () => {
	// fetch(API_URL + "/api/tweet", {
	// 	method: "GET",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		Accept: "application/json",
	// 		Authorization: Bearer,
	// 	},
	// })
	// 	.then((response) => {
	// 		if (response.ok) {
	// 			return response.json();
	// 		} else {
	// 			throw new Error("Something went wrong");
	// 		}
	// 	})
	// 	.then((data) => {
	// 		// buildPosts(data.result.tweets);
	// 		console.log(data.result.tweets);
	// 	})
	// 	.catch((error) => {
	// 		console.log("Fetch Error :-S", error);
	// 	});
};

const submitNewTweet = (formData) => {
	alert("Your Tweet was sent.");
	modal.style.display = "none";
	document.getElementById("form-post-content").value = "";

	// fetch(API_URL + "/api/tweet", {
	// 	method: "POST",
	// 	body: formData,
	// 	headers: {
	// 		Authorization: Bearer,
	// 	},
	// })
	// 	.then((response) => {
	// 		if (response.ok) {
	// 			return response.json();
	// 		} else {
	// 			throw new Error("Something went wrong");
	// 		}
	// 	})
	// 	.then((data) => {
	// 		// location.href = "/login.html";
	// 		alert("Your Tweet was sent.");
	// 		modal.style.display = "block";
	// 		document.getElementById("form-post-content").value = "";
	// 	})
	// 	.catch((error) => {});
};
