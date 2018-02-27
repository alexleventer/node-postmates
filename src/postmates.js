const request = require('request-promise');

class Postmates {
  constructor(customerId, apiKey) {
    if (!customerId) {
      throw new Error('Missing parameter, customerId');
    }
    if (!apiKey) {
      throw new Error('Missing parameter, apiKey');
    }
    this.customerId = customerId;
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.postmates.com/';
  }
  query(method, endpoint, body) {
    const url = `${this.baseUrl}${endpoint}`;
    return request({
      url,
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`,
      },
      formData: body,
      json: true,
    });
  }

  getDeliveryQuote(pickupAddress, dropoffAddress) {
    return this.query('POST', `/v1/customers/${this.customerId}/delivery_quotes`, {
      pickup_address: pickupAddress,
      dropoff_address: dropoffAddress,
    });
  }

  getDeliveryZones() {
    return this.query('GET', '/v1/delivery_zones');
  }

  createDelivery(delivery) {
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
    return this.query('GET', `/v1/customers/${this.customerId}/deliveries/${deliveryId}`);
  }

  cancelDelivery(deliveryId) {
    return this.query('POST', `/v1/customers/${this.customerId}/deliveries/${deliveryId}/cancel`);
  }

  addTipToDelivery(deliveryId, tipAmount) {
    return this.query('POST', `/v1/customers/${this.customerId}/deliveries/${deliveryId}`, {
      tip_by_customer: tipAmount,
    });
  }
}

module.exports = Postmates;
