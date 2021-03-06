<img src="postmates_logo_horiz_black.png" width="200px" alt="Postmates Logo" />

# node-postmates [![Build Status](https://travis-ci.org/alexleventer/node-postmates.svg?branch=master)](https://travis-ci.org/alexleventer/node-postmates) [![Maintainability](https://api.codeclimate.com/v1/badges/f5504e000019ed2ff1cb/maintainability)](https://codeclimate.com/github/alexleventer/node-postmates/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/f5504e000019ed2ff1cb/test_coverage)](https://codeclimate.com/github/alexleventer/node-postmates/test_coverage)

Promise based Node.js client for the [Postmates API](https://postmates.com/developer/).

## Installation
`npm install --save node-postmates`

## Example Usage

```javascript
const { CLIENT_ID, API_KEY } = process.env;
import Postmates from 'node-postmates';
const postmates = new Postmates(CLIENT_ID, API_KEY);

return postmates.getDeliveryZones()
  .then(zones => console.log(`These are zones Postmates supports: ${zones}`));
```
