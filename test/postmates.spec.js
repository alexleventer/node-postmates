const should = require('should');
const Postmates = require('../lib/postmates');
const assert = require('assert');

describe('Postmates Client Test', function() {
  let postmates = new Postmates('', '');
  it('should throw error if apiKey is not provided', function() {
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
      });
  });

  it('should create delivery', function() {
    const pickupAddress = '20 McAllister St, San Francisco, CA';
    const dropoffAddress = '101 Market St, San Francisco, CA';
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((quote) => {
        const delivery = {
          quoteId: quote.id, // The ID of a previously generated delivery quote. Optional, but recommended.
          manifest: 'Test delivery', // A detailed description of what the courier will be delivering.
          manifestReference: '123', // Optional reference that identifies the manifest.
          pickupName: 'Alex Test', // Name of the place where the courier will make the pickup
          pickupAddress: pickupAddress, // The pickup address for the delivery.
          pickupPhoneNumber: '123-123-1234', // The phone number of the pickup location.
          pickupBusinessName: '', // Optional business name of the pickup location.
          pickupNotes: '', // Additional instructions for the courier at the pickup location.
          dropoffName: 'Alex Test', // Name of the place where the courier will make the dropoff.
          dropoffAddress: dropoffAddress, // The dropoff address for the delivery.
          dropoffPhoneNumber: '123-123-1234', // The phone number of the dropoff location.
          dropoffBusinessName: '', // Optional business name of the dropoff location.
          dropoffNotes: '', // Additional instructions for the courier at the dropoff location.
        };
        return postmates.createDelivery(delivery)
          .then((results) => {
            results.should.have.property('kind', 'delivery');
            results.should.have.property('status', 'pending');
          });
      });
  });

  it('should list deliveries', function() {
    const pickupAddress = '20 McAllister St, San Francisco, CA';
    const dropoffAddress = '101 Market St, San Francisco, CA';
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((quote) => {
        const delivery = {
          quoteId: quote.id, // The ID of a previously generated delivery quote. Optional, but recommended.
          manifest: 'Test delivery', // A detailed description of what the courier will be delivering.
          manifestReference: '123', // Optional reference that identifies the manifest.
          pickupName: 'Alex Test', // Name of the place where the courier will make the pickup
          pickupAddress: pickupAddress, // The pickup address for the delivery.
          pickupPhoneNumber: '123-123-1234', // The phone number of the pickup location.
          pickupBusinessName: '', // Optional business name of the pickup location.
          pickupNotes: '', // Additional instructions for the courier at the pickup location.
          dropoffName: 'Alex Test', // Name of the place where the courier will make the dropoff.
          dropoffAddress: dropoffAddress, // The dropoff address for the delivery.
          dropoffPhoneNumber: '123-123-1234', // The phone number of the dropoff location.
          dropoffBusinessName: '', // Optional business name of the dropoff location.
          dropoffNotes: '', // Additional instructions for the courier at the dropoff location.
        };
        return postmates.createDelivery(delivery)
          .then((delivery) => {
            return postmates.listDeliveries()
              .then((deliveries) => {
                const deliveryIds = deliveries.data.map(item => item.id);
                assert.ok(true, deliveryIds.indexOf(delivery.id));
              })
          });
      });
  });

  it('should get delivery', function() {
    const pickupAddress = '20 McAllister St, San Francisco, CA';
    const dropoffAddress = '101 Market St, San Francisco, CA';
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((quote) => {
        const delivery = {
          quoteId: quote.id, // The ID of a previously generated delivery quote. Optional, but recommended.
          manifest: 'Test delivery', // A detailed description of what the courier will be delivering.
          manifestReference: '123', // Optional reference that identifies the manifest.
          pickupName: 'Alex Test', // Name of the place where the courier will make the pickup
          pickupAddress: pickupAddress, // The pickup address for the delivery.
          pickupPhoneNumber: '123-123-1234', // The phone number of the pickup location.
          pickupBusinessName: '', // Optional business name of the pickup location.
          pickupNotes: '', // Additional instructions for the courier at the pickup location.
          dropoffName: 'Alex Test', // Name of the place where the courier will make the dropoff.
          dropoffAddress: dropoffAddress, // The dropoff address for the delivery.
          dropoffPhoneNumber: '123-123-1234', // The phone number of the dropoff location.
          dropoffBusinessName: '', // Optional business name of the dropoff location.
          dropoffNotes: '', // Additional instructions for the courier at the dropoff location.
        };
        return postmates.createDelivery(delivery)
          .then((delivery) => {
            return postmates.getDelivery(delivery.id)
              .then((results) => {
                results.should.have.property('kind', 'delivery');
                results.should.have.property('status', 'pending');
              });
          });
      });
  });

  it.only('should cancel delivery', function() {
    const pickupAddress = '20 McAllister St, San Francisco, CA';
    const dropoffAddress = '101 Market St, San Francisco, CA';
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((quote) => {
        const delivery = {
          quoteId: quote.id, // The ID of a previously generated delivery quote. Optional, but recommended.
          manifest: 'Test delivery', // A detailed description of what the courier will be delivering.
          manifestReference: '123', // Optional reference that identifies the manifest.
          pickupName: 'Alex Test', // Name of the place where the courier will make the pickup
          pickupAddress: pickupAddress, // The pickup address for the delivery.
          pickupPhoneNumber: '123-123-1234', // The phone number of the pickup location.
          pickupBusinessName: '', // Optional business name of the pickup location.
          pickupNotes: '', // Additional instructions for the courier at the pickup location.
          dropoffName: 'Alex Test', // Name of the place where the courier will make the dropoff.
          dropoffAddress: dropoffAddress, // The dropoff address for the delivery.
          dropoffPhoneNumber: '123-123-1234', // The phone number of the dropoff location.
          dropoffBusinessName: '', // Optional business name of the dropoff location.
          dropoffNotes: '', // Additional instructions for the courier at the dropoff location.
        };
        return postmates.createDelivery(delivery)
          .then((delivery) => {
            return postmates.cancelDelivery(delivery.id)
              .then((results) => {
                results.should.have.property('kind', 'delivery');
                results.should.have.property('status', 'canceled');
              });
          });
      });
  });
});