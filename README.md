Marvel Hero Finder

This project is a simple web application that retrieves and displays data from the Marvel API. Users can enter their name to get a personalized hero ID and view related hero information. The application uses HTML, CSS, and JavaScript to display data and navigate between different hero profiles.

Installation

Clone the Repository:

git clone git@github.com:Cherrymood/Fetch-API.git
cd marvel-hero-finder

Open the Project Locally:
Navigate to the project folder and open the index.html file in your preferred web browser.

Dependencies:
This project uses md5 for hashing, which is included via CDN in the HTML file. No additional package installation is required.

Usage

Navigate to the Input Form:
On the home page, you will find a form where you can enter your name.
Get Your Hero ID:
Enter your name and submit the form to get a personalized hero ID.
View Hero Information:
The application fetches hero data from the Marvel API and displays it on the page.
Navigate Between Heroes:
Use the navigation links to view different heroes or refresh the page to generate a new hero ID.

API Reference

Marvel API:
The application fetches data from the Marvel API using a public API key.
API Endpoint: http://gateway.marvel.com/v1/public/characters
Parameters:
ts: Timestamp for the request.
apikey: Public API key.
hash: MD5 hash of the ts, private key, and public key.
limit: Number of results to return.
offset: Offset value to determine which hero data to fetch.
Project Structure

index.html: Main HTML file for the application.
styles.css: CSS file to style the application.
script.js: JavaScript file that handles API requests, DOM manipulation, and event handling.
README.md: Documentation file for the project.


Features

Hero ID Generation: Generates a unique hero ID based on the user's name.
Dynamic Data Fetching: Retrieves and displays hero data from the Marvel API.
Navigation: Provides easy navigation between different hero profiles.
Responsive Design: Styled to work well on different screen sizes.
Known Issues

API Rate Limits: The Marvel API has rate limits that may affect data retrieval if too many requests are made in a short period.
Error Handling: Limited error handling is implemented. API request failures may result in no data being displayed.

![screenshot](./public/images/Marvel.png)
![screenshot](./public/images/Marvel_res.png)
