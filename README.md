# Trendy Music Warehouse

### Explore the best selling + 100s of songs, manage your own favorite playlist.

---

TrendyM provides a variety of music categorized by different singers with different genres, trendyM is a personal music management platform.

<img src="https://github.com/AJClassic2014/trendy-music/blob/master/Screenshot.png" width="500px" alt="trendyM" border="0" />

## Key Features

- [Search] - Effective music search with text predictive function, no need to worry if you cannot remember the name of the song or singer's name exactly, 
your input will be auto-corrected and auto-filled if the input is existing in the database.

- [Play] - Once you select one of the singers, it will be redirected to this singer's page which includes a list of his/her 
songs and his/her songs will be played automatically.

- [History] - TrendyM will record your song browsing history if you log into your own station, you can find the songs you listened before at "my stations".

- [Favorite] - You can save the songs you like and find them at "my stations" - "Favorite Songs", which you are able to recall and replay your favorite music.

## Set Up

- [Install Node and npm] - project has done with Node v16.2.0 and Npm 7.13.0
- [MongoDB] - You can use MongoDB Atlas or install MongoDB at local directory, if you install it locally, open a terminal, check your directory and change it to `/usr/local/Cellar/mongodb-community@4.0/4.0.27/bin`,
then run
```
./mongod
```
you enable the MongoDB server on your localhost, and then import some sample data in singers.js and videos.js from `https://github.com/AJClassic2014/trendy-music/tree/master/be/sql`

- [Build the project at localhost] - Clone this project then change your terminal direcotry to the project, you will find 2 folders, "be" stands for backend, "fe" stands for frontend,
open another terminal, change your terminal direcotry to be folder, then install the project
```
npm install
```
then you can run the project in the localhost
```
npm start 
```
now the back end is running at port 3001

open the third terminal, change your terminal direcotry to fe folder, then install the project
```
npm install
```
then you can run the project in the localhost
```
npm start 
```
now the front end is running at port 3000, and you can see the page if you visit localhost:3000

## Limits

Music files can be found in front end folder, it is supposed to be a seperate and dedicated server and host for songs, singers and music information, possible 
to be improved later to visit the page faster

## Found a Bug? Have a suggestion?

If an issue exists, please [contact us](https://yinfei-profile.web.app/) or add a comment detailing your specific suggestions.

