/** @format */
/**
 *  in the login page
 *  Check if token is available
 *  if token is available take the redirect user to the home page
 *  in home page also
 *  Check if token is available
 *  if token is not available redirect user to login page
 */

const currentToken = localStorage.getItem("token");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const existingEmail = urlParams.get("existingEmail");
const registeredEmail = urlParams.get("registered");

window.onload = () => {
	const loginForm = document.getElementById("loginForm");
	const emailInput = loginForm.email;

	if (existingEmail) {
		emailInput.value = existingEmail;
		emailInput.style.backgroundColor = "#1da1f2";
		emailInput.style.fontSize = "20px";
		emailInput.style.color = "white";
		emailInput.style.transition = "0.5s";
	}
	if (registeredEmail) {
		const newRegisterEmailInput = document.querySelector(
			".login-container #registered",
		);
		newRegisterEmailInput.style.display = "block";
	}
};

// check if the user is already login
const checkIfLoggedIn = () => {
	const currentToken = localStorage.getItem("token");
	if (currentToken) {
		if (
			location.href.includes("/welcoming.html") ||
			location.href.includes("/login.html") ||
			location.href.includes("/register.html")
		) {
			location.href = "/";
		}
	} else if (!currentToken) {
		// If I am currently not logged in
		// And trying to access a unauthorized page
		// (Trying to access all pages besides login)
		if (
			!location.href.includes("/login.html") &&
			!location.href.includes("/register.html")
		) {
			location.href = "/welcoming.html";
		}
	}
};

// first remove the token from localStorage
// and then redirect user to go login page for sigin in
const LogOut = () => {
	localStorage.removeItem("token");
	location.href = "welcoming.html";
};

// load this one directly
checkIfLoggedIn();
