// Get the information submitted through the URL
const myInfo = new URLSearchParams(window.location.search);

// Check whether the required application information exists
const firstName = myInfo.get("first-name");
const lastName = myInfo.get("last-name");
const organizationTitle = myInfo.get("organization-title");
const email = myInfo.get("email");
const phone = myInfo.get("phone");
const organization = myInfo.get("organization");
const timestamp = myInfo.get("timestamp");

// Find the application summary section
const applicationSummary = document.querySelector(".application-summary");

// Check whether the visitor submitted an application
if (firstName && lastName && email && phone && organization && timestamp) {

    // Display the submitted information
    document.querySelector("#first-name").textContent = firstName;
    document.querySelector("#last-name").textContent = lastName;
    document.querySelector("#organization-title").textContent = organizationTitle || "Not provided";
    document.querySelector("#email").textContent = email;
    document.querySelector("#phone").textContent = phone;
    document.querySelector("#organization").textContent = organization;

    // Format and display the application date
    document.querySelector("#timestamp").textContent =
        new Date(timestamp).toLocaleString();

} else {

    // Hide the application details if no submission information exists
    applicationSummary.hidden = true;
}