[![Build Status](https://travis-ci.com/arnaud512/worldify.svg?branch=master)](https://travis-ci.com/arnaud512/worldify)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=worldify&metric=alert_status)](https://sonarcloud.io/dashboard/index/worldify)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=worldify&metric=ncloc)](https://sonarcloud.io/dashboard/index/worldify)

# Worldify

Get the Spotify content based on your favorite country!

## Motivation

Spotify has great playlists prepared for each country, changing according to the time of day.
The problem is that you can’t see playlists featured from other countries.
This is where Worldify comes in.

![Screenshow worldify](https://github.com/arnaud512/worldify/raw/master/src/assets/worldify.png "Worldify")


From its web interface, you can access playlists from many countries and open them directly in the spotify app.
With Worldify, you will be able to discover new categories that you would not have discovered with the Spotify app.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Build and push to docker
`ng build --prod`
`docker image build -t arnaud512/spotify-featured:latest .`
`docker push arnaud512/spotify-featured:latest`

OR

`npm run push`
