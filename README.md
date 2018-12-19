# Stockmoji

## Description

Server and database for storing users and stock information from Stockmoji. Stockmoji is a stock sentiment analysis application that boils down all those complicated figures into something digestible for the common human, emojis. It sources sentiment from Twitter and analysis from the Google Cloud Language API.

___

## Tech Used

- Postgresql

- Node

- Express

- Express-session

- Knex

- Body-parser

- Cors

- Bcrypt

- Session-file-store

- Morgan

___

## Installation

- Clone the repo to your local machine using your terminal and the URL in the green "clone" button
- Navigate inside the folder you just cloned and run ```npm install``` to get all the dependencies installed.
- You will need to create a postgresql database on your local machine, I use ```createdb stockmoji``` (stockmoji is the name of the database)
- Once you've done that, you'll need to run your migrations using knex, ```knex migrate:latest```
- It should all be ready to roll! Smash that ```npm start``` button and try it out!
