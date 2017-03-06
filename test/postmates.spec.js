const should = require('should');
const Postmates = require('../lib/postmates');
const assert = require('assert');

describe('Postmates Client Test', function() {
  let postmates = new Postmates('', '');
  it.skip('should throw error if apiKey is not provided', function() {
    try {
      postmates = new Postmates('clientId');
      assert.ok('false', 'apiKey was not provided but should have been');
    } catch(e) {
      e.should.containEql('Missing apiKey');
    }
  });

  it('should get delivery quote', function() {
    const pickupAddress = '20 McAllister St, San Francisco, CA';
    const dropoffAddress = '101 Market St, San Francisco, CA';
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((results) => {
        results.should.have.property('currency', 'usd');
      });
  });

  it('should get delivery zones', function() {
    return postmates.getDeliveryZones()
      .then((results) => {
        results[0].should.have.property('type', 'FeatureCollection');
      })
  });
});