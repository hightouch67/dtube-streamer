# Avalon Stream with NodeJS + Javalon + Axios + Redis + Mysql

Stream the Avalon Chain using Axios and store the current block number into a Redis server giving you a good base to build an API and a stream reader which does not miss blocks. 
Also provide an example of filtering transaction and a MYSQL configuration if you are using a database.

## Installation

Clone the repo & install dependencies.
```bash
git clone https://github.com/hightouch67/dtube-streamer.git
cd dtube-streamer
npm install 
```
Put your Redis Server info into redis.js
Put your Mysql Server info into db.js

Start the stream 
```bash
npm run
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Thanks
fabien - adrien
