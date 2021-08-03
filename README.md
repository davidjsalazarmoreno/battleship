[![Twitter](https://img.shields.io/twitter/follow/davidjsmoreno.svg?style=social&label=@davidjsmoreno)](https://twitter.com/davidjsmoreno)

![Travis Status](https://img.shields.io/travis/davidjsalazarmoreno/battleship?branch=main)
[![Coverage Status](https://coveralls.io/repos/github/davidjsalazarmoreno/battleship/badge.svg?branch=main)](https://coveralls.io/github/davidjsalazarmoreno/battleship?branch=main)

# Battleship

## Setup

```
$ nvm install
$ nvm use
$ npm install
```

## Start dev server

```
$ npm run start
```

## Run tests

```
$ npm run test
```

## Deploy

We're using github pages, to trigger a re-deploy first checkout the main branch and remove the docs/ folders, then run the following commands.

```
$ npm run build
$ mv ./build ./docs
$ git add docs
$ git commit -m "new release" --no-verify
$ git push origin main
```

After that you need to go to [https://davidjsalazarmoreno.github.io/](https://davidjsalazarmoreno.github.io/) to check your changes.
