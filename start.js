const express = require('express');
const Promise = require('bluebird');
const client = require('./helpers/client');
const redis = require('./helpers/redis');
const { init, work } = require('./src');
const axios = require('axios')
const app = express();
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`[start] Listening on ${port}`));

//** Start with a custom block number at start (remove after the first use) */
// const customBlockNum = 225656;
// redis.setAsync('block_height', customBlockNum).then(() => {
//   handleBlock(customBlockNum);
// }).catch((err) => {
//   console.error("Failed to set 'block_height' on Redis", err);
//   handleBlock(customBlockNum);
// });

let lastBlockNum = 0;
const stream = setInterval(() => {
  axios(client.config.api + 'count').then(function (response) {
    if (!response)
      console.log('Api error')
    lastBlockNum = response.data.count
  })
}, 3000);



const handleBlock = blockNum => {
  if (lastBlockNum >= blockNum) {
    axios(client.config.api + 'block/' + blockNum).then(response => {
      let block = response.data
      if (block._id) {
        work(block, blockNum).then(() => {
          redis
            .setAsync('block_height', blockNum)
            .then(() => {
              console.log(`[start] New block height is ${blockNum} ${block.timestamp}`);
              handleBlock(blockNum + 1);
            })
            .catch(err => {
              console.error("[start] Failed to set 'block_height' on Redis", err);
              handleBlock(blockNum);
            });
        });
      } else {
        console.error('[start] Block is not valid');
        handleBlock(blockNum);
      }
    })
      .catch(err => {
        //console.error(`[start] Request 'getBlock' failed at block num: ${blockNum}, retry`, err);
        handleBlock(blockNum);
      });
  } else {
    Promise.delay(100).then(() => {
      handleBlock(blockNum);
    });
  }
};

const start = () => {
  init().then(() => {
    redis
      .getAsync('block_height')
      .then(blockHeight => {
        console.log(`[start] Last loaded block was ${blockHeight}`);
        const nextBlockNum = blockHeight ? parseInt(blockHeight) + 1 : 1;
        handleBlock(nextBlockNum);
      })
      .catch(err => {
        console.error("[start] Failed to get 'block_height' on Redis", err);
      });
  });
};

start();
