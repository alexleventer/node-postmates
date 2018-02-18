# node-postmates [![Build Status](https://travis-ci.org/alexleventer/node-postmates.svg?branch=master)](https://travis-ci.org/alexleventer/node-postmates)

Promise based Node.js client for the [Postmates API](https://postmates.com/developer/).

## Installation
`npm install --save node-postmates`

## Example Usage

```
const { CLIENT_ID, API_KEY } = process.env;
import Postmates from 'node-postmates';
const postmates = new Postmates('YOUR CLIENT ID', 'YOUR API KEY');

return postmates.getDeliveryZones()
  .then((zones) => {
    console.log(`These are zones Postmates supports: ${zones}`);
  });
```
