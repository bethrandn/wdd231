// Get the current year
const currentYear = new Date().getFullYear();

// Display the current year in the footer
document.querySelector("#current-year").textContent = currentYear;

// Get the last modified date
const lastModified = document.lastModified;

// Display the last modified date in the footer
document.querySelector("#last-modified").textContent = lastModified;
