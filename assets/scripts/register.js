/** @format */

// Selectors
const registerForm = document.getElementById("registerForm");
const Bearer = "Bearer " + localStorage.getItem("token");

let API_URL = "http://localhost:3000";

if (location.href.indexOf("netlify") != -1) {
	API_URL = "https://twitter-clone-app-saddam.herokuapp.com";
}

/**
 * Event handler for a form  on submit event.
 * @param {SubmitEvent} event
 */
registerForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const user = document.getElementById("registerForm");
	const payload = {
		firstName: user.firstName.value,
		// lastName: user.lastName.value,
		email: user.email.value,
		password: user.password.value,
	};
	registerUser(payload);
});

const registerUser = (payload) => {
	fetch(API_URL + "/api/user/signup", {
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
			location.href = `/login.html?existingEmail=${payload.email}&registered=true`;
		})
		.catch((error) => {
			alert("already register");
			location.href = `/login.html?existingEmail=${payload.email}`;
			// console.log("Fetch Error :-S", error);
		});
};
