"use strict";

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
// const form = document.getElementById("form");

let readers_log = localStorage.getItem("readers_log")
  ? JSON.parse(localStorage.getItem("readers_log"))
  : [];

let sign_up_form = document.getElementById("sign-up-form");

sign_up_form.addEventListener("submit", register);

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

function register(event) {
  event.preventDefault();
  const username = document.getElementById("sign-up-name").value;
  const email = document.getElementById("sign-up-email").value;
  const password = document.getElementById("sign-up-pass").value;

  if (username && validateEmail(email) && password.length >= 8) {
    const reader = {
      username: username,
      email: email,
      password: password,
      fav_books: [],
    };
    readers_log.push(reader);
    alert("Registered successfully!");
    save_data_local();
  } else {
    alert("Check your input!");
  }
}

function save_data_local() {
  let save_data = JSON.stringify(readers_log);
  localStorage.setItem("readers_log", save_data);
  console.log(readers_log, save_data);
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById("sign-in-email").value;
  const password = document.getElementById("sign-in-pass").value;
  const data_login = localStorage.getItem("readers_log");
  const convetr_data = JSON.parse(data_login);
  console.log(convetr_data);

  if (email && password) {
    const reader = convetr_data.find(
      (reader) => reader.email == email && reader.password == password
    );
    if (reader) {
      console.log("hi");
      localStorage.setItem("currentUser", email);
      window.location.href = "../index.html";
    } else {
      alert("Invalid email or password!");
    }
  } else {
    alert("Please fill in all fields!");
  }
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regex.test(email);
}
