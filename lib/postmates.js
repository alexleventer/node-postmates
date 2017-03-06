const request = require('request-promise');

class Postmates {
  constructor(customerId, apiKey) {
    this.customerId = customerId;
    this.apiKey = apiKey;
    this.baseUrl =  'https://api.postmates.com/';
    if(!customerId) {
      throw new Error('Missing customerId');
    }
    if(!apiKey) {
      throw new Error('Missing apiKey');
    }
  }

  getDeliveryQuote(pickupAddress, dropoffAddress) {
    return request({
      url: `${this.baseUrl}/v1/customers/${this.customerId}/delivery_quotes`,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${new Buffer(this.apiKey + ":").toString('base64')}`,
      },
      formData: {
        pickup_address: pickupAddress,
        dropoff_address: dropoffAddress,
      },
      json: true,
    })
      .then((results) => {
        return results;
      });
  }
};

module.exports = Postmates;