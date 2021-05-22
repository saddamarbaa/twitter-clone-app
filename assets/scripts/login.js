/** @format */

// Selectors
const loginForm = document.getElementById("loginForm");
const Bearer = "Bearer " + localStorage.getItem("token");
let API_URL = "http://localhost:3000";

if (location.href.indexOf("netlify") != -1) {
	API_URL = "https://twitter-clone-app-saddam.herokuapp.com";
}

/**
 * Event handler for a form  on submit event.
 * @param {SubmitEvent} event
 */
loginForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const user = document.loginform;
	const payload = {
		email: user.email.value,
		password: user.password.value,
	};
	loginfetch(payload);
});

const loginfetch = (payload) => {
	fetch(API_URL + "/api/user/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: Bearer,
		},

		body: JSON.stringify(payload),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Something went wrong");
			}
		})
		.then((data) => {
			localStorage.setItem("token", data.token);
			location.href = "/";
		})
		.catch((error) => {
			// console.log("Fetch Error :-S", error);
		});
};

// redirect user to the register page
const redirectToRegisterPage = () => (location.href = "/register.html");
