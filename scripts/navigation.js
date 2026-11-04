// Get the menu button and navigation menu
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

// Open and close the navigation menu
menuButton.addEventListener("click", function () {
mainNav.classList.toggle("show");
});
