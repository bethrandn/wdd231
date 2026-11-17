// Get the current date and time when the page loads
const timestamp = new Date();

// Find the hidden timestamp field
document.querySelector("#timestamp").value = timestamp.toISOString();

// Select all membership benefit links
const membershipLinks = document.querySelectorAll(".membership-card a");

// Add an event listener to each membership link
membershipLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        // Find the dialog using the link's href
        const modal = document.querySelector(link.getAttribute("href"));

        // Open the dialog
        modal.showModal();
    });
});

// Select all modal close buttons
const closeButtons = document.querySelectorAll(".close-modal");

// Add an event listener to each close button
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Find the dialog containing this button
        const modal = button.closest("dialog");

        // Close the dialog
        modal.close();
    });
});