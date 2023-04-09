# NodeJs_conference_schedule_app
Sample Conference Schedule NodeJS app

# Description
This is a sample express REST API application to schedule conferences with topics which speakers can self nominate themselves. Later attendees can vote for these topics to help pick higest rated topic for conference.

# ERD diagram
![Screenshot (3)](https://user-images.githubusercontent.com/46703346/230787784-fe52bbc4-9ef4-450c-86da-2ef4efa5f77c.png)

# Prerequists
* Install Nodejs
* Install mysql
* Install Postman
* Install Vscode IDE for development

# How to use?
* Clone the app
* Do "npm install"
* Run "node app.js"

# What it provides?
* provides simple REST APIs shown in below swagger doc to create conferences, topics, attendee, speakers, self nominate for topic, vote for topic and fetch highest voted topic.
* You can access the swagger doc by visiting "http://localhost:3000/api-docs"
![Screenshot (5)](https://user-images.githubusercontent.com/46703346/230791775-8253387f-cd21-4697-ba80-944bf334e022.png)


# What Next?
* Adding user authentication using JWT
* Auto generating swagger doc from schemas
* Add some more validations and also response validation based on schema

