const request = require('request-promise');

class Postmates {
  constructor(customerId, apiKey) {
    if (!customerId) {
      throw new Error('Missing customerId');
    }
    if (!apiKey) {
      throw new Error('Missing apiKey');
    }
    this.customerId = customerId;
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.postmates.com/';
  }

  query(method, endpoint, body) {
    return request({
      url: `${this.baseUrl}${endpoint}`,
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer(`${this.apiKey}:`).toString('base64')}`,
      },
      formData: body,
      json: true,
    });
  }

  getDeliveryQuote(pickupAddress, dropoffAddress) {
    if (!pickupAddress) {
      throw new Error('Missing parameter pickupAddress');
    }
    if (!dropoffAddress) {
      throw new Error('Missing parameter dropoffAddress');
    }
    return this.query('POST', `/v1/customers/${this.customerId}/delivery_quotes`, {
      pickup_address: pickupAddress,
      dropoff_address: dropoffAddress,
    });
  }

  getDeliveryZones() {
    return this.query('GET', '/v1/delivery_zones');
  }

  createDelivery(delivery) {
    if (!delivery) {
      throw new Error('Missing parameter delivery');
    }
    return this.query('POST', `/v1/customers/${this.customerId}/deliveries`, {
      quote_id: delivery.quoteId,
      manifest: delivery.manifest,
      manifest_reference: delivery.manifestReference,
      pickup_name: delivery.pickupName,
      pickup_address: delivery.pickupAddress,
      pickup_phone_number: delivery.pickupPhoneNumber,
      pickup_business_name: delivery.pickupBusinessName,
      pickup_notes: delivery.pickupNotes,
      dropoff_name: delivery.dropoffName,
      dropoff_address: delivery.dropoffAddress,
      dropoff_phone_number: delivery.dropoffPhoneNumber,
      dropoff_business_name: delivery.dropoffBusinessName,
      dropoff_notes: delivery.dropoffNotes,
    });
  }

  listDeliveries() {
    return this.query('GET', `/v1/customers/${this.customerId}/deliveries`);
  }

  getDelivery(deliveryId) {
    if (!deliveryId) {
      throw new Error('Missing parameter deliveryId');
    }
    return this.query('GET', `/v1/customers/${this.customerId}/deliveries/${deliveryId}`);
  }

  cancelDelivery(deliveryId) {
    if (!deliveryId) {
      throw new Error('Missing parameter deliveryId');
    }
    return this.query('POST', `/v1/customers/${this.customerId}/deliveries/${deliveryId}/cancel`);
  }

  addTipToDelivery(deliveryId, tipAmount) {
    if (!deliveryId) {
      throw new Error('Missing parameter deliveryId');
    }
    if (!tipAmount) {
      throw new Error('Missing parameter tipAmount');
    }
    return this.query('POST', `/v1/customers/${this.customerId}/deliveries/${deliveryId}`, {
      tip_by_customer: tipAmount,
    });
  }
}

module.exports = Postmates;
