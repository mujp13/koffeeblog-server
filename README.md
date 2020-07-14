## Koffeeblog-server

Koffeeblog-server is a back-end server for Koffeeblog, the frontend.

## Running the tests

To run front-end or back-end tests, simply run "npm t" in the terminal.

## Live App

https://koffeeblg-capstone.vercel.app

## API Overview

/api  
.  
├── /contents  
│ └── GET  
│  
├── /guestbook  
│ └── GET  
│ └── POST  
│ └── /

## API Overview

## GET ### /api/contents

Returns an array of blog items with associated images

{  
 title: Text,  
 typeid: Text,  
 content: Text,  
 imageURL : Text  
}

## GET ### /api/guestbook

Returns an array of user comments left in Guestbook page

{  
 title: Text,  
 comment: Text  
}

## POST ### /api/guestbook

A typical user comment submission via a POST request with "title" and "comments" as text values

{  
 title: Text,  
 comment: Text  
}

## Screenshot

![koffeeblog screenshot](https://github.com/mujp13/koffee_blog_fs/blob/master/github_screenshot.PNG)

## Built With

Node - Run-time environment  
Express - Web application framework  
Postgres DB - Database  
Mocha - Testing  
Chai - Testing  
Javascript - Front-end development

## Authors

Keun Suk Park - Full-stack
