const Postmates = require('../lib/postmates');
const assert = require('assert');
const should = require('should');

describe('Postmates Client Test', () => {
  const clientId = process.env.CLIENT_ID;
  const apiKey = process.env.API_KEY;
  const pickupAddress = '20 McAllister St, San Francisco, CA';
  const dropoffAddress = '101 Market St, San Francisco, CA';
  if (!clientId || !apiKey) {
    throw new Error('A CLIENT_ID and API_KEY environment variable are required to run tests');
  }
  const postmates = new Postmates(clientId, apiKey);
  const delivery = {
    manifest: 'Test delivery',
    manifestReference: '123',
    pickupName: 'Alex Test', // Name of the place where the courier will make the pickup
    pickupPhoneNumber: '301-461-8133', // The phone number of the pickup location.
    pickupBusinessName: '', // Optional business name of the pickup location.
    pickupNotes: '', // Additional instructions for the courier at the pickup location.
    dropoffName: 'Alex Test', // Name of the place where the courier will make the dropoff.
    dropoffPhoneNumber: '301-461-8133', // The phone number of the dropoff location.
    dropoffBusinessName: '', // Optional business name of the dropoff location.
    dropoffNotes: '', // Additional instructions for the courier at the dropoff location.
  };

  it('should get delivery quote', () => {
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
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((quote) => {
        return postmates.createDelivery(Object.assign(delivery, {
          pickupAddress,
          dropoffAddress,
          quoteId: quote.id,
        }))
          .then((results) => {
            results.should.have.property('kind', 'delivery');
            results.should.have.property('status', 'pending');
          });
      });
  });

  it('should list deliveries', () => {
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((quote) => {
        return postmates.createDelivery(Object.assign(delivery, {
          pickupAddress,
          dropoffAddress,
          quoteId: quote.id,
        }))
          .then((deliveryResult) => {
            return postmates.listDeliveries()
              .then((deliveries) => {
                const deliveryIds = deliveries.data.map(item => item.id);
                assert.ok(true, deliveryIds.indexOf(deliveryResult.id));
              });
          });
      });
  });

  it('should get delivery', () => {
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((quote) => {
        return postmates.createDelivery(Object.assign(delivery, {
          quoteId: quote.id,
          pickupAddress,
          dropoffAddress,
        }))
          .then((deliveryResult) => {
            return postmates.getDelivery(deliveryResult.id)
              .then((results) => {
                results.should.have.property('kind', 'delivery');
                results.should.have.property('status', 'pending');
              });
          });
      });
  });

  it('should cancel delivery', () => {
    return postmates.getDeliveryQuote(pickupAddress, dropoffAddress)
      .then((quote) => {
        return postmates.createDelivery(Object.assign(delivery, {
          quoteId: quote.id,
          pickupAddress,
          dropoffAddress,
        }))
          .then((deliveryResults) => {
            return postmates.cancelDelivery(deliveryResults.id)
              .then((results) => {
                results.should.have.property('kind', 'delivery');
                results.should.have.property('status', 'canceled');
              });
          });
      });
  });
});
