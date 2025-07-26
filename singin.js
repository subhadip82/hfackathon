const showCreate = document.getElementById('show-create');
const backSignin = document.getElementById('back-signin');
const signinBox = document.getElementById('signin-box');
const createBox = document.getElementById('create-box');

showCreate.addEventListener('click', () => {
  signinBox.classList.add('hidden');
  createBox.classList.remove('hidden');
});

backSignin.addEventListener('click', () => {
  createBox.classList.add('hidden');
  signinBox.classList.remove('hidden');
});

// signin.js

// When user clicks Sign In button
document.querySelector("#signin-box button").addEventListener("click", () => {
  window.location.href = "index.html";
});

// When user clicks Create Account button
document.querySelector("#create-box button").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Toggle between Sign In and Create Account
document.getElementById("show-create").addEventListener("click", () => {
  document.getElementById("signin-box").classList.add("hidden");
  document.getElementById("create-box").classList.remove("hidden");
});

document.getElementById("back-signin").addEventListener("click", () => {
  document.getElementById("create-box").classList.add("hidden");
  document.getElementById("signin-box").classList.remove("hidden");
});
