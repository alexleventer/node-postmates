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

  query(method, endpoint, body) {
    return request({
      url: `${this.baseUrl}${endpoint}`,
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${new Buffer(this.apiKey + ":").toString('base64')}`,
      },
      formData: body,
      json: true,
    });
  }

  getDeliveryQuote(pickupAddress, dropoffAddress) {
    return this.query("POST", `/v1/customers/${this.customerId}/delivery_quotes`, {
      pickup_address: pickupAddress,
      dropoff_address: dropoffAddress,
    });
  }

  getDeliveryZones() {
    return this.query("GET", `/v1/delivery_zones`);
  }

  createDelivery(delivery) {
    return this.query("POST", `/v1/customers/${this.customerId}/deliveries`, {
      quote_id: delivery.quoteId, // The ID of a previously generated delivery quote. Optional, but recommended.
      manifest: delivery.manifest, // A detailed description of what the courier will be delivering.
      manifest_reference: delivery.manifestReference, // Optional reference that identifies the manifest.
      pickup_name: delivery.pickupName, // Name of the place where the courier will make the pickup
      pickup_address: delivery.pickupAddress, // The pickup address for the delivery.
      pickup_phone_number: delivery.pickupPhoneNumber, // The phone number of the pickup location.
      pickup_business_name: delivery.pickupBusinessName, // Optional business name of the pickup location.
      pickup_notes: delivery.pickupNotes, // Additional instructions for the courier at the pickup location.
      dropoff_name: delivery.dropoffName, // Name of the place where the courier will make the dropoff.
      dropoff_address: delivery.dropoffAddress, // The dropoff address for the delivery.
      dropoff_phone_number: delivery.dropoffPhoneNumber, // The phone number of the dropoff location.
      dropoff_business_name: delivery.dropoffBusinessName, // Optional business name of the dropoff location.
      dropoff_notes: delivery.dropoffNotes, // Additional instructions for the courier at the dropoff location.
    });
  }

  listDeliveries() {
    return this.query("GET", `/v1/customers/${this.customerId}/deliveries`);
  }

  getDelivery(deliveryId) {
    return this.query("GET", `/v1/customers/${this.customerId}/deliveries/${deliveryId}`);
  }

  cancelDelivery(deliveryId) {
    return this.query("POST", `/v1/customers/${this.customerId}/deliveries/${deliveryId}/cancel`);
  }

  addTipToDelivery(deliveryId, tipAmount) {
    return this.query("POST", `/v1/customers/${this.customerId}/deliveries/${deliveryId}`, {
      tip_by_customer: tipAmount,
    });
  }
};

module.exports = Postmates;
