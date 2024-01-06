const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripeRegistrationStripeId =
  process.env.REACT_APP_STRIPE_REGISTRATION_PRICE_ID;
const serverUrl = process.env.REACT_APP_SERVER_URL;

if (!stripePublicKey) {
  throw new Error('REACT_APP_STRIPE_PUBLISHABLE_KEY is not set');
}

if (!stripeRegistrationStripeId) {
  throw new Error('REACT_APP_STRIPE_REGISTRATION_PRICE_ID is not set');
}

if (!serverUrl) {
  throw new Error('REACT_APP_SERVER_URL is not set');
}

export const config = {
  serverUrl,
  stripePublicKey,
  stripeRegistrationStripeId,
};
