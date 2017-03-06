const should = require('should');
const Postmates = require('../lib/postmates');
const assert = require('assert');

describe('Postmates Client Test', function() {
  it.skip('should throw error if apiKey is not provided', function() {
    try {
      const postmates = new Postmates('clientId');
      assert.ok('false', 'apiKey was not provided but should have been');
    } catch(e) {
      e.should.containEql('Missing apiKey');
    }
  });

  it('should get delivery quote', function() {
    const pickupAddress = '20 McAllister St, San Francisco, CA';
    const dropoffAddress = '101 Market St, San Francisco, CA';
    const postmates = new Postmates('', '')
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((results) => {
        results.should.have.property('currency', 'usd');
      });
  });

  it('should get delivery zones', function() {

  });
});