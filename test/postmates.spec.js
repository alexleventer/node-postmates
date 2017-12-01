const Postmates = require('../lib/postmates');
const assert = require('assert');
const should = require('should');

describe('Postmates Client Test', () => {
  const clientId = process.env.CLIENT_ID;
  const apiKey = process.env.API_KEY;
  if(!clientId || !apiKey) {
    throw new Error('A CLIENT_ID and API_KEY environment variable are required to run tests');
  }
  const postmates = new Postmates(clientId, apiKey);

  it('should get delivery quote', () => {
    const pickupAddress = '20 McAllister St, San Francisco, CA';
    const dropoffAddress = '101 Market St, San Francisco, CA';
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((results) => {
        results.should.have.property('currency', 'usd');
      });
  });

  it('should get delivery zones', () => {
    return postmates.getDeliveryZones()
      .then((results) => {
        results[0].should.have.property('type', 'FeatureCollection');
      });
  });

  it('should create delivery', () => {
    const pickupAddress = '20 McAllister St, San Francisco, CA';
    const dropoffAddress = '101 Market St, San Francisco, CA';
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((quote) => {
        const delivery = {
          quoteId: quote.id,
          manifest: 'Test delivery',
          manifestReference: '123',
          pickupName: 'Alex Test', // Name of the place where the courier will make the pickup
          pickupAddress, // The pickup address for the delivery.
          pickupPhoneNumber: '301-461-8133', // The phone number of the pickup location.
          pickupBusinessName: '', // Optional business name of the pickup location.
          pickupNotes: '', // Additional instructions for the courier at the pickup location.
          dropoffName: 'Alex Test', // Name of the place where the courier will make the dropoff.
          dropoffAddress, // The dropoff address for the delivery.
          dropoffPhoneNumber: '301-461-8133', // The phone number of the dropoff location.
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
          pickupAddress, // The pickup address for the delivery.
          pickupPhoneNumber: '301-461-8133', // The phone number of the pickup location.
          pickupBusinessName: '', // Optional business name of the pickup location.
          pickupNotes: '', // Additional instructions for the courier at the pickup location.
          dropoffName: 'Alex Test', // Name of the place where the courier will make the dropoff.
          dropoffAddress, // The dropoff address for the delivery.
          dropoffPhoneNumber: '301-461-8133', // The phone number of the dropoff location.
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
          pickupAddress, // The pickup address for the delivery.
          pickupPhoneNumber: '301-461-8133', // The phone number of the pickup location.
          pickupBusinessName: '', // Optional business name of the pickup location.
          pickupNotes: '', // Additional instructions for the courier at the pickup location.
          dropoffName: 'Alex Test', // Name of the place where the courier will make the dropoff.
          dropoffAddress, // The dropoff address for the delivery.
          dropoffPhoneNumber: '301-461-8133', // The phone number of the dropoff location.
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

  it('should cancel delivery', function() {
    const pickupAddress = '20 McAllister St, San Francisco, CA';
    const dropoffAddress = '101 Market St, San Francisco, CA';
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((quote) => {
        const delivery = {
          quoteId: quote.id, // The ID of a previously generated delivery quote. Optional, but recommended.
          manifest: 'Test delivery', // A detailed description of what the courier will be delivering.
          manifestReference: '123', // Optional reference that identifies the manifest.
          pickupName: 'Alex Test', // Name of the place where the courier will make the pickup
          pickupAddress, // The pickup address for the delivery.
          pickupPhoneNumber: '301-461-8133', // The phone number of the pickup location.
          pickupBusinessName: '', // Optional business name of the pickup location.
          pickupNotes: '', // Additional instructions for the courier at the pickup location.
          dropoffName: 'Alex Test', // Name of the place where the courier will make the dropoff.
          dropoffAddress, // The dropoff address for the delivery.
          dropoffPhoneNumber: '301-461-8133', // The phone number of the dropoff location.
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