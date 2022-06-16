# Dashboard Wheel The World

A straightforward visual tool for WTW people to keep a track on the maps and mappers' insights (related to Places to Stay), built using React with Typescript.

![Wheel The World Logo](https://yt3.ggpht.com/ytc/AKedOLTqfmzzNJXFj_68GOpz6aZDrXKWDXlp_SCpc5Vr=s900-c-k-c0x00ffffff-no-rj)

## Project demo
(Insert demo link here).

## System Features
- AMS Maps: A view where you can find global insights, related to the presence of WTW in the world and its growing features throughout time. It includes a date picker for the user to choose their preferred statistics.
- Mappers Overview: A view where you can see all the people in charge of mapping, who are the core of WTW. Dashboard users are able to filter them based on their contributions and even send them mail messages.
- Map Details: A view where you can see each map in detail, including the mapper's name and picture, type of accommodation, address, and a lot of features related to the mapping progress.
- Mapper Details: A view where you can see each mapper in detail, including all of their contributions, performance statistics, and their activity inside the AMS.

## Development
- Clone the repo:
```
$ git clone https://github.com/EmmanuelBoM/dashWTW.git
```

- Go to the project directory and install dependencies (using yarn):
```
$ cd dashWTW
$ yarn
```

- Go to the project directory and install dependencies (using npm):
```
$ cd dashWTW
$ npm i
```

- To properly run this project, you'll need to authenticate users by using Firebase. We invite you to add an .env file manually in the root directory. Firstly, create your own firebase project and its database. Inside that .env file, add the following line:
```
REACT_APP_ACCESS_KEY = {your access key here, without spaces, formatted in just one line}
```

- To show the app in your browser (using yarn):
```
$ yarn start
```

- To show the app in your browser (using npm):
```
$ npm start
```

## Give it a try!
You can also see our demo live! Just click in this link:
[https://wtwdashboard.netlify.app/](url)


## Interesting links
- Wheel the World Website:
[https://wheeltheworld.com/](url)
- About Wheel the World:
[https://wheeltheworld.com/about-us](url)
- Backend Repository:
[https://github.com/VicReyes1/apiWTW](url)


## Contributors
- Diana Guadalupe García Aguirre @DianaA96
- Emmanuel Bolteada Manzo @EmmanuelBoM
- José Herón Samperio León @HeronSamperio
- Edgar Daniel Acosta Rosales @DonKatsun
- Víctor Serrano Reyes @VicReyes1

### [Tasks distribution]: https://github.com/VicReyes1/dashWTW/projects/1
### [Backend Repository]: https://github.com/VicReyes1/apiWTW
