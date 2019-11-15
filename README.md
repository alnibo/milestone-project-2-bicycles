      ____   ____        _     ____    _   _   ____   ____
     / ___| |  __ \     / \   / ___|  | | | | |  __| / ___|
    | |     | |__) |   / ∆ \  \___ \  | |_| | | |_   \___ \
    | |___  |  __ \   / ___ \  ___) | |  _| | | |__   ___) | 
     \____| |_|  \_\ /_/   \_\|____/  |_| |_| |____| |____/

--------------------------- -------------------------------------- 

# Bicycle crashes in Chapel Hill 2007-2013

Stream Two Project - Interactive Frontend Development - Code Institute

This dashboard aims at providing information about bicycle crahes in Chapel Hill for the years of 2007-2013. Simple numbers and graphic displays should make it easy for the user to find out more about each crash. Interactive charts provide the user the possibility to select segments of the data they are interested in and analyse them in greater detail.

## Demo

Check out the deployed website [here]( https://alnibo.github.io/milestone-project-2-bicycles/).

## UX

The goal for this website was to provide information for anyone who wants to find out more about bicycle crashes in Chapel Hill. When and where do these crashes typically happen? Who is involved in these crashes? Being aware of all that cyclists and vehicule drivers may have a better understanding on what and where to look out for and how to be more cautious.

Simple and clear charts that are interactive should help the user to understand the data and easily analyse it in more detail.

In order to present the infromation in a clear and easy way, a modern look with light colors and a simple desgin was chosen.

When analysing the data it is important to reset the data at any time. For this a "Reset" button was added to the navigation bar, which is fixed at the top of the page and therefore always accessible.

A help modal was added, which can be accessed hrough the "Help" button in the navigation bar on the top. A pop-up window appears, where the user can find information on how to use the website. It can be closed by either clicking the close button at the top right corner or by clicking anywhere outside the help window.

To enhance user experience a button was added on the bottom of the page in order to jump back up to the top.

As part of the design process wireframes were created to visualise and give an outline of the structures and layouts for both the mobile and desktop view. They can be viewed [here](https://github.com/alnibo/milestone-project-2-bicycles/tree/master/assets/wireframes).

## Features

1. Interactive Charts using DC, D3 and crossfilter
    1. Pie and donut Charts - showing gender and age distributions 
    2. Bar Chart - illustrating the distribution over the year by month
    3. Row Charts - displaying injury severnesses and bicycle crash areas
    4. Composite Line Chart - showing the time of crashes for each day
2. Selector that enables users to analyse the data for each year 
3. Responsive design using the Bootstrap Grid system, making sure the website is compatible on all screen sizes
4. Fixed navbar, with a responsive brand name that disapears for smaller screen sizes, but buttons that are always accessible

### Features left to implement

The crashes could be displayed on a map in order to demonstrate which areas are most prone for bicycle collision.

The data could be compared to a dataset from a different region to see if there are any differences.

## Technologies Used

1. HTML
2. CSS
3. Bootstrap (4.3.1)
4. JavaScript
5. Font Awesome
6. Google Fonts
6. D3.js
7. DC.js
8. Crossfilter.js
9. Queue.js
10. AWS Cloud9
10. GitHub

## Testing

This website was manually tested from the perspective of a first time user navigating through the site verifying that all links and buttons correctly function.

As part of the testing procedure this website was tested with https://validator.w3.org/. A few errors and several warnings were displayed in the CSS file due to the boostrap link.

Ensuring its responsiveness this website was tested across different mobile devices. In a second step it was then tested across the most common internet browsers (Safari, Chrome, Internet Explorer, and Firefox), making sure it is compatible. For an overview, please see this excel file [here](https://github.com/alnibo/milestone-project-2-bicycles/blob/master/assets/testing-wireframes/Testing-resp-comp.pdf).

During the testing procedure it became clear that some media queries need to be created in order to maintain a good design across all screen sizes.

The labels of the age donut chart were cut off at certain times. I resolved this issue by adjusting the values of `externalLabels` and `transform`, in order to display the values closer to the center and therefore not to get cut off.

The link to the data set was manually tested. By using `target="_blank"` it was made sure that links will open in a new tab.

The number display of the amount of crashes in the top left of the page was first meant to be connected with the data and would have adjusted when selecting a data segment. For this following code was used and inserted in the urban_rural_number function in the js file.

    `dc.numberDisplay("#crash-number")
        .valueAccessor(function(d) {
            return d.total;
        })
        .group(urbanPercent);`
        
While the number was now linked to the data and showing the amount of crashes when selecting a specific data segment it was displaying a wrong number in two cases. First, if nothing was selected - meaning it should display the amount of all crashes - it displayed 5 incidents too many. Second, when gender of biker "Male" was selected in the left pie chart it showed 3 cases to many. After being in contact with tutor support it turned out the code was correct, just that there might be a problem in the data set. However, no error was found when testing the csv-file on this [website](https://csvlint.io/). After checking the all the entries in the data file manually and finding no abnormalities I resolved to displaying a fixed number of all total crashes.

## Deployment

This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch. 

To run locally, you can clone this repository directly into the editor of your choice by pasting `git clone https://github.com/alnibo/milestone-project-2-bicycles.git` into your terminal.

## Credits

### Data

The data set of bicycle crashes was retrieved from [Data.gov](https://catalog.data.gov/dataset/bicycle-crashes).

### Media

The top header picture was taken from the online image library [Pixabay](https://pixabay.com/).

The town seal of Chapel Hill used in the navbar and in the title bar as the icon logo was retrieved form [here](https://chapelhillpubliclibrary.org/town-seal/).

### Acknowledgements

Information about the charts came from [here](https://dc-js.github.io/dc.js/examples/).

The navbar was retrieved from the Bootstrap [documentation](https://getbootstrap.com/docs/4.3/getting-started/introduction/) and then altered and customized for this site.

The inspiration for the general layout came from this [project](https://github.com/Angie55/IFD_Milestone_Project_Two_Dashboard).

The help modal was built with this template [How To Create a Modal Box](https://www.w3schools.com/howto/howto_css_modals.asp).