# groupProject_teamSoFetch

> Outline a brief description of your project.
> Live demo [_here_](https://brendan838.github.io/groupProject_teamSoFetch/). <!-- If you have the project hosted somewhere, include the link here. -->

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)
<!-- * [License](#license) -->

## General Information

- This project is designed to generate multiple-choice questions and interactive coding challenges.
- What is the purpose of your project?
  The purpose of this project is to use two server-size APIs and demonstrate client-side storage to store presistent data.
- Why did you undertake it?
  To feature dynamically updated HTML and CSS powered by Javascript code.

<!-- You don't have to answer all the questions - just the ones relevant to your project. -->

## Technologies Used

- HTML5
- CSS
- Javascript
- Visual Studio

## Features

List the ready features here:

- Provided with starter code
- FontAwesome.com
- Fonts.google.com
- Semantic-ui.com
- w3schools.com

## Screenshots

![Example screenshot](Assets\browserpic.PNG)

![Example screenshot](Assets\browserpicthree.PNG)

![Example screenshot](Assets\browserpictwo.PNG)

![Example screenshot](Assets\phonepic.PNG)

![Example screenshot](Assets\phonepictwo.PNG)

<!-- If you have screenshots you'd like to share, include them here. -->

## Setup

What are the project requirements/dependencies? Where are they listed? Where is it located? Proceed to describe how to install / setup one's local environment / get started with the project.

- The URL of the deployed application.
- The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.
- Must use at least two server-side APIs
- Must use a CSS framework other than Bootstrap
- Must meet good quality coding standards

## Usage

How does one go about using it?

- To create a clean, polished, and responsive user interface.

For example:

function getGIF(searchItem, gifEl) {
var requestUrl =
"https://api.giphy.com/v1/gifs/search?api_key=0pXpAzRY9RmZGboXjvmC9uwTPKv6JApT&q=" +
searchItem +
"&limit=50&offset=0&rating=pg-13&lang=en";

fetch(requestUrl)
.then(function (response) {
return response.json();
})
.then(function (data) {
console.log(data);
var i = Math.floor(Math.random() \* data.data.length);
console.log(i);
var randomGif = data.data[i].images.downsized.url;
gifEl.setAttribute("src", randomGif);
});
}

## Acknowledgements

Give credit here.

- This project was inspired by Trilogy Education.
- Many thanks to Trilogy Education.

## Contact

Created by

- [@kabaothao](https://github.com/kabaothao)
- [@Brendan838](https://github.com/Brendan838)
- [@izzziej](https://github.com/izzziej)

<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
