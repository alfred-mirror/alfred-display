# alfred-display

### An Internet-of-Things smart mirror built with JavaScript and Raspberry Pi - works with a [client-side dashboard](https://github.com/alfred-mirror/alfred-dashboard) which pushes directly to the [mirror display](https://github.com/alfred-mirror/alfred-display).

#### The App is on [Heroku](http://alfred-dashboard.herokuapp.com/)
It is recommended to use the deployed version of this app so you don't have to constantly run multiple local servers. However, an installation guide for a local server is available at [Alfred](https://github.com/alfred-mirror/alfred).

#### Installation via GitHub Repo
Make sure to have a clean version of [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) running on your [Raspberry Pi](https://www.raspberrypi.org/). Git clone this repo, install all dependencies and build:
```
git clone https://github.com/alfred-mirror/alfred-display
cd alfred-display
npm install
gulp build:dev
npm start
```
Note: ```npm install``` takes a long time - to avoid building locally on the Raspberry Pi, try installing with wget.

A window should automatically open. At the top of the window, enter your user id (created after you have registered as a user on the [Alfred Dashboard](http://alfred-dashboard.herokuapp.com/)).

If running the entire system locally, make sure both the Alfred Dashboard's server and the Alfred server are also running. The client-dashboard should be now working on the specified port or defaults to ```localhost:3000```.

You can also open the mirror display on ```localhost:8081``` on your preferred browser.

#### Installation via wget
Make sure to have a clean version of [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) running on your [Raspberry Pi](https://www.raspberrypi.org/). Then run the following commands:
```
wget <put in mirror app download url>
unzip <name of file>
```
If haven't yet installed an unzipper on your Raspberry Pi: ```sudo apt-get install unzip```

Then inside the unzipped folder, run the local server:  
```
cd <name of file>
node server.js
```

Open the browser at ```localhost:8081``` and at the top of the window, enter your user id (created after you have registered as a user on the [Alfred Dashboard](http://alfred-dashboard.herokuapp.com/)).

The mirror should now be linked to your dashboard.

### Issues? Suggestions? Comments?
Submit an issue on [GitHub](https://github.com/alfred-mirror/alfred-display/issues).

### License
MIT Licensed. For more details, see the [LICENSE](https://github.com/alfred-mirror/alfred-display/blob/master/LICENSE.md) file.
