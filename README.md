      ____   ____        _     ____    _   _   ____   ____
     / ___| |  __ \     / \   / ___|  | | | | |  __| / ___|
    | |     | |__) |   / _ \  \___ \  | |_| | | |_   \___ \
    | |___  |  __ \   / ___ \  ___) | |  _| | | |__   ___) | 
     \____| | |  \ \ /_/   \_\|____/  |_| |_| |____| |____/

--------------------------- -------------------------------------- 

# Bicycle crashes in Chapel Hill 2007-2013

Stream Two Project - Interactive Frontend Development - Code Institute

This dashboard aims at providing information about bicycle crahes in Chapel Hill for the years of 2007-2013. With simple numbers and graphic displays should make it easy for the user to find out more about each crash. Interactive charts provide the user the possibility to select segments of the data they are interested in and analyse these in greater detail.

## Demo

Check out the deployed website [here]( https://alnibo.github.io/milestone-project-2-bicycles/).

## UX

The goal for this website was to provide information for anyone who wants to find out more about bicycle crashes in Chapel Hill and thereby know what and where to look out for and how to be more cautious.

Simple and clear charts that are interactive should help the user to understand the data and easily analyse it in more detail.

In order to present the infromation in a clear and easy way, a modern look with light colors and a simple desgin was chosen.

When analysing the data it is important to reset the data at any time. For this a "Reset all" button was added to the navigation bar, which is fixed at the top of the page. On mobile use it is accessible through the dropdown toggle button.

A help modal was added, which can be accessed hrough the "Help" button in the navigation bar on the top. A pop-up window appears, where the user can find information on how to use the website. I can be closed by either clicking the close button at the top right corner or by clicking anywhere outside the help window.

To enhance user experience a button was added on the bottom of the page in order to jump back up to the top.

As part of the design process wireframes were created to visualise and give an outline of the structures and layouts for both the mobile and desktop view. They can be viewed [here](https://github.com/alnibo/milestone-project-2-bicycles/tree/master/assets/wireframes).

## Features

1. Interactive Charts using DC, D3 and crossfilter.
2. Responsive design using the Bootstrap Grid system, making sure the website is compatible on all screen sizes
3. Fixed navbar, which collapses when in mobile use, so as not to overgrowd the screen

### Features left to implement

The crashes could be displayed on a map in order to demonstrate which areas are most prone for bicycle collision.

## Technologies Used

1. HTML
2. CSS
3. Bootstrap (4.3.1)
4. JavaScript
5. Font Awesome
6. D3.js
7. DC.js
8. Crossfilter.js
9. Queue.js

## Testing

This website was manually tested from the perspective of a first time user navigating through the site verifying that all links and buttons correctly function.

As part of the testing procedure this website was tested with https://validator.w3.org/. A few errors and several warnings were displayed in the CSS file due to the boostrap link.

Ensuring its responsiveness this website was tested across different mobile devices. In a second step it was then tested across the most common internet browsers (Safari, Chrome, Internet Explorer, and Firefox), making sure it is compatible. For an overview, please see this excel file [here]().

During the testing procedure it became clear that some media queries need to be created in order to maintain a good design across all screen sizes.

## Deployment

This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch. 

To run locally, you can clone this repository directly into the editor of your choice by pasting `git clone https://github.com/alnibo/milestone-project-2-bicycles.git` into your terminal.

## Credits

### Data
The data set of bicycle crashes was retrieved from [Data.gov](https://catalog.data.gov/dataset/bicycle-crashes).

### Media
The top header picture was taken from the online image library [Pixabay](https://pixabay.com/).

The town seal of Chapel Hill used in the navbar was retrieved form [here](https://chapelhillpubliclibrary.org/town-seal/).

### Acknowledgements

The navbar was retrieved from the Bootstrap [documentation](https://getbootstrap.com/docs/4.3/getting-started/introduction/) and then altered and customized for this site.

The inspiration for the general layout came from this [project](https://github.com/Angie55/IFD_Milestone_Project_Two_Dashboard).

The help modal was built with this template [How To Create a Modal Box](https://www.w3schools.com/howto/howto_css_modals.asp).